ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_role text;

UPDATE public.blog_posts
SET author_role = 'Founder, TEXITcoin'
WHERE author_role IS NULL;

UPDATE public.blog_posts
SET
  author = 'Mati Allin',
  author_role = 'Contributor',
  body_markdown = $$# Did TEXITcoin Make Its Winning Case in the Biggest Crypto Legal Battle Ever Livestreamed on YouTube?

A firsthand account of four days before the Texas State Office of Administrative Hearings

By Mati Allin | TEXITcoiner, YouTuber, and 10-year crypto veteran

Author's note: This article reflects my personal observations and opinions; it is not an official transcript.

This is not legal or financial advice. I am not a lawyer. Crypto is risky; you could profit, or you could lose everything.

TL;DR

* TEXITcoin has not officially won: the Administrative Law Judge (ALJ) has not yet issued her recommendation on the merits.
* Initial post-hearing briefs are due October 9, 2026; final briefs are due October 23. The ALJ's recommendation is expected by December 22, possibly sooner.
* In my view, respondents presented a strong case that the mining packages were service contracts for the output of mining a commodity, not investment contracts. The Texas State Securities Board (TSSB) argued otherwise.
* The fraud allegations appeared weak to me, but the ALJ has not ruled, and the availability of refunds or other remedies remains contested.
* The witness testimony was dramatic at times. The accounting and technical testimony was less exciting, but it may prove just as important.

My short answer is that TEXITcoin did not legally win this week because no final merits decision exists yet. But after watching every minute of the hearing, I believe respondents had a very strong four days.

## Four Days in Austin

This week I attended all 26.5 hours of the hearing in Austin, Texas. The official case is Texas State Securities Board v. TEXITcoin, MineTXC, Blockchain Mint, and Robert J. Gray, SOAH Docket No. 312-26-14427. It concerns the Emergency Cease and Desist Order issued on February 11, 2026.

The order alleges, among other things, that mining packages were unregistered securities, that respondents or sales agents were not properly registered, and that the offering involved fraudulent or materially misleading statements or omissions. Respondents deny those allegations.

Before the hearing, the ALJ denied respondents' motion for summary disposition because disputed facts and competing inferences required a full evidentiary hearing. That procedural ruling did not decide the merits, but it underscores the central point: no side has officially won yet.

## Big Views for an Administrative Hearing

Public interest was extraordinary. At the end of day one, I saw more than 6,100 views on the SOAH YouTube page. At the time, the streams were available only in real time. Our announcement on X / Twitter received more than 120,000 impressions. Most administrative hearings are not watched by thousands of people online or attended by a visible public audience.

## The Legal Vocabulary

This was a state administrative proceeding, so the vocabulary differs from an ordinary court case. The presiding official is an administrative law judge, the trial is called a hearing, and the defendants are called respondents. The TSSB is the petitioner.

The ALJ rules on procedural and evidentiary questions during the hearing, but the anticipated merits document is a Proposal for Decision or recommendation to the agency rather than a conventional trial-court judgment. The proceeding is civil and administrative, not criminal. Its result will not create binding judicial precedent in the same way an appellate opinion would, although a favorable outcome could still carry persuasive weight in Texas and beyond.

## The Legal Teams

Avi Perry served as lead attorney for respondents, primarily supported at the hearing by Alex Rossmiller, Joshua Fiveson, and Michael Bloom. Fiveson previously served as a judge at SOAH. Jeramy Heintz led the TSSB team, primarily supported by Justin Bontrager and Kristin McCourt. The Honorable Katerina DeAngelo presided as the ALJ.

According to TEXITcoin's public legal page, the project has spent more than $2,662,000 out of pocket on legal costs, and that figure continues to climb.

Using Quinn Emanuel, one of the world's leading litigation firms, matters. This is not a precedential federal case, but a favorable result could still provide useful clarity and discourage similarly aggressive theories elsewhere. In that practical sense, a win in Texas could matter far beyond Texas.

## Error 404: Are Some Respondents Separate Legal Entities?

The hearing took place in Room 404, which produced an almost perfect legal joke: respondents argued that several named respondents did not exist as separate legal entities.

The Emergency Cease and Desist Order names TEXITcoin, MineTXC, Blockchain Mint, and Robert J. Gray. Respondents argued that TEXITcoin is a blockchain, while MineTXC and Blockchain Mint were names used for operations run by Gray rather than separate legal entities capable of being sued. On cross-examination, the TSSB investigator acknowledged that a blockchain is not itself a legal entity. Respondents asked the ALJ to dismiss the improperly named parties.

That issue has not yet been decided on the merits. Perry also questioned the investigator about statements in the emergency order that respondents contend were inaccurate or unsupported. The ALJ will decide what weight those admissions and disputes deserve.

## The Fraud Allegations and Radical Transparency

In my view, the fraud theory was the weakest part of the state's case. Respondents emphasized that the investigator reviewed approximately 90 weekly Zoom or YouTube calls, many lasting more than an hour, without identifying a specific lie by Gray in those broadcasts.

The record included examples of Gray publicly discussing the Mulligan Mint bankruptcy, reporting setbacks, warning about risk, explaining commissions, and showing how funds were used. TEXITcoin also maintained a public dashboard and posted receipts. Accounting records were later offered to support respondents' contention that funds were used for the stated business purposes rather than diverted for personal use.

Based on the evidence presented, I came away believing Gray's level of transparency was exceptional. He delivered hundreds of hours of public video updates, generally twice per week, and did not limit those updates to good news. He also collected the public filings and orders for this case on TEXITcoin's legal page.

According to testimony, approximately 55,000 individuals purchased mining packages totaling roughly $150 million and received daily allocations of TXC. Whether the disclosures satisfied every legal obligation is still for the ALJ to decide. The absence of evidence of misappropriation does not, by itself, resolve every securities-law theory based on alleged omissions.

## Mining Packages: Service Contracts or Investment Contracts?

The central dispute is not simply whether TXC itself is a commodity or a security. A crypto asset may be a non-security commodity while a particular transaction involving that asset may still be offered as an investment contract. The hearing therefore focused on the economic reality of the mining-package transactions.

Under the federal Howey framework discussed at the hearing, an investment contract generally involves an investment of money in a common enterprise with a reasonable expectation of profits derived from the entrepreneurial or managerial efforts of others. The parties disputed how those factors apply under the Texas Securities Act.

The TSSB argued that purchasers paid money and depended on respondents' continuing mining operations and other efforts. Respondents argued that purchasers bought contracts entitling them to a pro rata share of mining output, that the output was TXC - a digital commodity - and that operating the pool was administrative or ministerial compared with the computational work performed by the mining hardware. Respondents also argued that purchasers still had to take additional steps to hold, use, or sell their TXC.

Expert witness Andrew Sotak supported the respondents' position from technical and accounting perspectives. He characterized the packages as revenue contracts for mining-as-a-service rather than equity interests or securities. The TSSB challenged that conclusion and emphasized the continuing efforts required to operate the mine.

If the packages are found to be securities, their offer and sale in Texas would be subject to securities-registration and dealer-or-agent requirements unless an exemption applied. If they are found to be service contracts involving delivery of a commodity, the securities claims would be substantially weakened. Other laws and any independently proven fraud theory would still need to be considered.

## The Late Seat-Swap Theory

Late in the hearing, Heintz emphasized the transferability of mining seats, arguing that the ability to swap or transfer a seat could be a security-like benefit separate from the daily receipt of TXC. The TSSB pointed to a help-desk article containing a line about the possible profitability of seat swaps in a section discussing the no-refund policy.

Respondents objected that the theory was not identified in the Emergency Cease and Desist Order and that introducing it at the hearing deprived them of fair notice and a meaningful opportunity to prepare.

Perry said relying on that theory could create a serious issue on appeal. In my opinion, the economic evidence did not make seat swapping look like the reason purchasers bought the packages. The parties will address the theory again in two rounds of post-hearing briefs.

## The Witnesses: What Happened

> The following account is based on my contemporaneous notes, not an official transcript. I have paraphrased the testimony and arguments except where a short phrase is clearly identified.

### Witness 1: Robert J. "Bobby" Gray

Gray appeared by Zoom and testified for many hours, including part of day two. His charisma came through. During the repeated authentication of videos, he joked that the person shown was him and that he looked handsome, drawing a smile and laughter from the ALJ and courtroom.

The parties discussed The Path to $16, an article about what could happen if the project succeeded. The TSSB treated price projections and Gray's confidence as evidence of promised profits. Respondents characterized the article as an aspirational scenario, not a guarantee of TXC's future market price.

Gray described himself as TEXITcoin's founder and fearless leader and explained his decades of work with community currencies. He testified about creating TEXITcoin, operating its mining program, designing a widely recognized physical Bitcoin coin when BTC traded near $5, disclosing the Mulligan Mint bankruptcy, and using Danager Resources as an assumed name that briefly accepted checks. He answered questions from the TSSB and his own attorneys.

**Witness 2: TSSB Investigator Phillip Fuselier**

Fuselier testified that he opened the case after hearing a TEXITcoin radio advertisement in March 2025. He investigated undercover, did not purchase a mining seat, and watched approximately 90 weekly Zoom or YouTube calls.

On cross-examination, Perry questioned him about the legal status of the named respondents, Gray's public references to the Mulligan Mint bankruptcy, and statements in the emergency order that respondents contend were inaccurate. Fuselier agreed that a blockchain is not a legal entity capable of responding to a lawsuit, even though TEXITcoin was named as a respondent. The parties sharply disputed whether Gray's bankruptcy disclosures were sufficiently prominent and directed to the relevant purchasers.

**Witness 3: Mr. Hesse**

Hesse, a non-Texas resident, purchased five mining packages. He described his aunt as a sales agent, a characterization that raised disputed questions under Texas securities law. Perry asked whether the TSSB helped prepare Hesse's affidavit.

During cross-examination, Perry introduced an email in which Hesse requested a refund and said he would stay out of the case if he was refunded. Respondents used the email to challenge his motivation and credibility. Perry also challenged Hesse's belief that TEXITcoin was connected to the State of Texas by invoking Texas Roadhouse as an example of a Texas-branded private company.

**Witness 4: Mr. Gamero**

Gamero, a Texas resident wearing a military uniform, testified through a poor internet connection. He purchased ten mining packages. On cross-examination by Rossmiller, he acknowledged that he received the TXC associated with his packages and was not expressly guaranteed that TXC's market price would rise. He also acknowledged that he could have asked questions but did not.

The TSSB had argued that Gray's earlier bankruptcy was material information that should have been disclosed to purchasers. Respondents' counsel confronted Gamero with his own personal bankruptcy and with hostile Facebook posts about Gray, using both subjects to challenge his credibility and the asserted importance of routine bankruptcy disclosure.

**Witness 5: Bret Hinson**

Hinson, a Texas resident, purchased one mining seat in August 2025. He testified that he did not know some purchaser funds would be used for marketing, but he received the TXC to which he was entitled. He said he never thought of buying a mine as equivalent to buying stock.

**Witness 6: Greg Block**

Block, a California resident, initially purchased three mining seats in August 2025 after a friend, Brad Varnell, told him TXC could be the next Bitcoin. He saw a video not made by Gray suggesting TXC could reach $2,000 per coin. Block said his friend pressured him to buy additional packages, and he eventually purchased eleven for approximately $9,000.

Block testified that he interpreted Gray's Path to $16 presentation and confident public statements as a guarantee and that he received fewer coins than expected. On cross-examination, Rossmiller questioned him about previous crypto losses, the general risk of cryptocurrency, whether Gray personally made the most aggressive promises, and why Block did not tell more people if he truly believed profits were guaranteed.

Respondents' counsel then introduced an email in which Block requested a refund and connected that request to whether he would testify. Counsel argued that the email undermined his credibility.

Rossmiller also questioned Block about public records reflecting a 1997 Chapter 7 bankruptcy that Block said he could not recall. Respondents asked the ALJ to strike the disputed testimony; the TSSB objected, and the testimony remained in the record.

Fiveson argued that the TSSB had provided an inaccurate evidence list and that the witness's testimony conflicted with public records. The ALJ declined to remove the testimony, leaving its credibility and weight to be decided later.

### Witness 7: Nike Nickel

Nickel, a Florida resident, purchased six mining packages and approximately $250,000 of TXC at around $4 per coin. He said he sold a Ken Griffey Jr. collection for bitcoin and later bought TXC after seeing price projections that included $16 by February 2026 and, eventually, $80. He testified that TXC rose to approximately $6, then fell about 30% in three days. He later sold near $0.80 and estimated his loss at $205,000.

Nickel characterized Gray's confidence as a promise. Perry showed him TEXITcoin articles containing risk warnings and statements that prices were not guaranteed. Perry also played a prior Zoom call in which Gray cautioned Nickel against putting his life savings into something as speculative as a lottery ticket.

At several points, the ALJ directed Nickel to answer the questions without adding a narrative. She eventually called a recess so TSSB counsel could speak with him about following those instructions. Perry also used the placement of a disclaimer in Nickel's own financial-advice book, The Softest Cushion to Fall Back On, to compare the visibility of that disclaimer with the risk disclosures on TEXITcoin's website.

During Nickel's testimony, the YouTube livestream was removed under the platform's harassment-and-bullying policy. Perry suggested that Nickel may have reported it, but no evidence presented at the hearing established who caused the removal. After Nickel's testimony, the TSSB rested.

## Respondents' Witnesses

### Marianne Escalante

Escalante works with Gray in the accounting department. She authenticated business records that respondents offered to show how funds were received and spent. Respondents relied on those records to support their position that funds were used for the stated business purposes.

### Andrew Sotak, Expert Witness

Bloom called Andrew Sotak as an expert witness. Sotak explained blockchain and mining concepts and presented his opinion that TXC has the characteristics of a digital commodity. He testified that he reviewed the full history of the TEXITcoin blockchain and found its recorded hash rate and difficulty data consistent with its operation. He also noted that TXC had no pre-mine.

Sotak characterized each mining-package sale as an agreement for a pro rata share of mining output. In his accounting opinion, the packages were ASC 606 revenue contracts resembling mining-as-a-service, not equity interests. He compared the arrangement with services offered by Blockware, a Texas mining company, and argued that calling something a mining share does not change its economic reality.

On cross-examination, Heintz emphasized that operating the mining system required continuing effort. The examination also covered difficulty adjustments, the timing of the TEXITcoin white paper, the differences between home miners and pool participants, merged mining, and whether transferability changed the service obligation.

The parties also discussed SEC Interpretive Release No. 33-11412, issued March 17, 2026 - after the emergency order but before the hearing. The release states that protocol mining activities conducted in the manner it describes do not involve an offer or sale of securities. Respondents argued that the guidance supported their position; the TSSB disputed whether the mining packages fit within the circumstances addressed by the release.

## Steve Walsh

Walsh, a Nevada resident who installs mining facilities for Gray, testified about his involvement with TEXITcoin since November 2024. He said he attended every Tuesday and Thursday Zoom meeting, heard Gray repeatedly warn that crypto was risky, and understood that no price was guaranteed. He also testified that he knew about the Mulligan Mint bankruptcy and saw both good and bad developments discussed publicly.

Walsh explained the mining sites, pool operations, and technical work involved. On cross-examination, the parties discussed merged mining and the differences between pool participants and home miners. Walsh said home miners could retain Litecoin and Dogecoin rewards, potentially offsetting electricity expenses. He brought warmth to the technical testimony, joking that the work mainly required a hardhat and a good attitude.

## Closing Arguments

Heintz's closing was brief. He argued that labels do not change economic reality and that the mining packages depended on respondents' continuing efforts.

Perry described the dispute as a case of first impression and argued that the TSSB had not met its burden of proof. He emphasized that purchasers received TXC, that none of the testifying purchasers said they bought packages expecting to resell the seats, and that the state had shifted late in the hearing toward a seat-swap theory that was absent from the emergency order.

Perry argued that the legal outcome should not turn on who physically plugged in the mining equipment. Home miners and package purchasers, he said, participated in the same proof-of-work network and ultimately received the same type of output: TXC. He also pointed to the SEC's proposed Regulation Crypto Assets, released on August 18 while the hearing was underway, and argued that the proposal's framework supported respondents' position.

On fraud, Perry argued that the TSSB had not established a duty to disclose the information identified in the order, that Gray had publicly disclosed the Mulligan Mint bankruptcy, and that the state's witnesses had significant credibility problems. He also renewed respondents' arguments concerning the improperly named parties, Danager Resources, and alleged intentional concealment. He asked the ALJ to reject the fraud allegations and set aside the order.

## What Happens Next

The ALJ concluded the hearing after four days. Initial post-hearing briefs are due October 9, 2026, and final briefs are due October 23. Her recommendation is expected within 60 days after the final briefs, placing the expected deadline on December 22, 2026. She remarked that she was eager to begin writing.

Will replay videos ever become available? I do not know, but I hope the ALJ permits their release. Until then, I hope this firsthand account helps people who missed one of the most widely watched crypto administrative hearings of its kind.

TEXITcoin has not officially won. The legal outcome remains pending. But based on what I watched, I believe respondents presented a powerful case, and I remain optimistic about TEXITcoin's future regardless of the outcome because of its honest-money values and remarkable community.

## Selected Public Documents

* Texas State Securities Board: Emergency Cease and Desist Order, No. ENF-26-CDO-1893
* SOAH: Order Denying Respondents' Motion for Summary Disposition, July 27, 2026
* TEXITcoin Legal and Regulatory Documents
* SEC Interpretive Release No. 33-11412, March 17, 2026
* SEC: Proposed Regulation Crypto Assets, August 18, 2026

*Note: The official hearing transcript and admitted exhibits, when available, control over this firsthand summary.*
$$
WHERE slug = 'guest-post-mati-allin-tssb-v-texitcoin-hearing';