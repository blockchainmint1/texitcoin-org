// Heuristic "% likely fake / inactive" score for an X account.
// This is an ESTIMATE derived from public signals, not an audit.
// Inputs are optional; we degrade gracefully when a signal is missing.

export type FakeScoreInputs = {
  followers?: number | null;
  following?: number | null;
  avgEngagementPerPost?: number | null; // likes + replies + reposts
  postsLast30d?: number | null;
  daysSinceLastPost?: number | null;
  defaultAvatarPct?: number | null; // 0..100 sampled
};

export type FakeScoreBreakdown = {
  score: number; // 0..100, higher = more likely inflated / inactive audience
  label: "low" | "moderate" | "elevated" | "high";
  factors: { label: string; delta: number; note: string }[];
};

export function computeFakeScore(i: FakeScoreInputs): FakeScoreBreakdown {
  const factors: { label: string; delta: number; note: string }[] = [];
  let score = 15; // baseline: every large account has some junk

  // Engagement rate vs a healthy crypto baseline (~0.5% engagements per follower per post)
  if (i.followers && i.followers > 0 && i.avgEngagementPerPost != null) {
    const rate = (i.avgEngagementPerPost / i.followers) * 100;
    if (rate < 0.05) {
      factors.push({
        label: "Very low engagement rate",
        delta: 30,
        note: `${rate.toFixed(3)}% engagement per follower is far below the ~0.5% crypto baseline`,
      });
      score += 30;
    } else if (rate < 0.15) {
      factors.push({
        label: "Low engagement rate",
        delta: 15,
        note: `${rate.toFixed(2)}% engagement per follower is below the ~0.5% crypto baseline`,
      });
      score += 15;
    } else if (rate > 1) {
      factors.push({
        label: "Healthy engagement rate",
        delta: -10,
        note: `${rate.toFixed(2)}% engagement per follower is above baseline`,
      });
      score -= 10;
    }
  }

  // Posting cadence & recency
  if (i.daysSinceLastPost != null) {
    if (i.daysSinceLastPost > 180) {
      factors.push({
        label: "Account has gone dark",
        delta: 20,
        note: `Last post was ${i.daysSinceLastPost} days ago — inactive accounts drift toward bot-heavy follower bases`,
      });
      score += 20;
    } else if (i.daysSinceLastPost > 30) {
      factors.push({
        label: "Sparse posting",
        delta: 8,
        note: `Last post was ${i.daysSinceLastPost} days ago`,
      });
      score += 8;
    }
  }
  if (i.postsLast30d != null && i.postsLast30d < 3) {
    factors.push({
      label: "Very low 30-day post volume",
      delta: 5,
      note: `${i.postsLast30d} posts in the last 30 days`,
    });
    score += 5;
  }

  // Default-avatar rate on a sampled slice of followers
  if (i.defaultAvatarPct != null) {
    if (i.defaultAvatarPct > 25) {
      factors.push({
        label: "High default-avatar rate",
        delta: 15,
        note: `${i.defaultAvatarPct.toFixed(0)}% of sampled followers use a default profile picture`,
      });
      score += 15;
    } else if (i.defaultAvatarPct > 12) {
      factors.push({
        label: "Elevated default-avatar rate",
        delta: 7,
        note: `${i.defaultAvatarPct.toFixed(0)}% of sampled followers use a default profile picture`,
      });
      score += 7;
    }
  }

  // Following ratio (accounts that follow almost no one but have huge followings can be inflated)
  if (i.followers && i.followers > 10000 && i.following != null && i.following < 200) {
    factors.push({
      label: "Very low follow-back ratio",
      delta: 3,
      note: `Follows ${i.following} accounts with ${i.followers.toLocaleString()} followers`,
    });
    score += 3;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const label: FakeScoreBreakdown["label"] =
    score < 20 ? "low" : score < 40 ? "moderate" : score < 60 ? "elevated" : "high";
  return { score, label, factors };
}
