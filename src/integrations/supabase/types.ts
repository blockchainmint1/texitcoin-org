export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          author_role: string | null
          body_markdown: string
          created_at: string
          date: string
          excerpt: string
          published: boolean
          read_minutes: number
          slug: string
          tag: string
          telegram_notified_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          author_role?: string | null
          body_markdown: string
          created_at?: string
          date: string
          excerpt: string
          published?: boolean
          read_minutes?: number
          slug: string
          tag: string
          telegram_notified_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          author_role?: string | null
          body_markdown?: string
          created_at?: string
          date?: string
          excerpt?: string
          published?: boolean
          read_minutes?: number
          slug?: string
          tag?: string
          telegram_notified_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      hit_list_coins: {
        Row: {
          argument_markdown: string | null
          cmc_id: number | null
          cmc_rank: number | null
          created_at: string
          gaps_json: Json | null
          name: string
          published: boolean
          slug: string
          snapshot_at: string
          symbol: string
          updated_at: string
          verdict: string
          verdict_note: string | null
          website: string | null
          x_account_created: string | null
          x_avg_likes: number | null
          x_avg_replies: number | null
          x_avg_reposts: number | null
          x_default_avatar_pct: number | null
          x_followers: number | null
          x_following: number | null
          x_handle: string | null
          x_last_post_at: string | null
          x_posts_30d: number | null
        }
        Insert: {
          argument_markdown?: string | null
          cmc_id?: number | null
          cmc_rank?: number | null
          created_at?: string
          gaps_json?: Json | null
          name: string
          published?: boolean
          slug: string
          snapshot_at?: string
          symbol: string
          updated_at?: string
          verdict?: string
          verdict_note?: string | null
          website?: string | null
          x_account_created?: string | null
          x_avg_likes?: number | null
          x_avg_replies?: number | null
          x_avg_reposts?: number | null
          x_default_avatar_pct?: number | null
          x_followers?: number | null
          x_following?: number | null
          x_handle?: string | null
          x_last_post_at?: string | null
          x_posts_30d?: number | null
        }
        Update: {
          argument_markdown?: string | null
          cmc_id?: number | null
          cmc_rank?: number | null
          created_at?: string
          gaps_json?: Json | null
          name?: string
          published?: boolean
          slug?: string
          snapshot_at?: string
          symbol?: string
          updated_at?: string
          verdict?: string
          verdict_note?: string | null
          website?: string | null
          x_account_created?: string | null
          x_avg_likes?: number | null
          x_avg_replies?: number | null
          x_avg_reposts?: number | null
          x_default_avatar_pct?: number | null
          x_followers?: number | null
          x_following?: number | null
          x_handle?: string | null
          x_last_post_at?: string | null
          x_posts_30d?: number | null
        }
        Relationships: []
      }
      legal_update_notifications: {
        Row: {
          entry_key: string
          notified_at: string
        }
        Insert: {
          entry_key: string
          notified_at?: string
        }
        Update: {
          entry_key?: string
          notified_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      screenplay_beats: {
        Row: {
          body: string
          created_at: string
          credit: string | null
          id: string
          kind: string
          media_url: string | null
          published: boolean
          season_slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          credit?: string | null
          id?: string
          kind?: string
          media_url?: string | null
          published?: boolean
          season_slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          credit?: string | null
          id?: string
          kind?: string
          media_url?: string | null
          published?: boolean
          season_slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "screenplay_beats_season_slug_fkey"
            columns: ["season_slug"]
            isOneToOne: false
            referencedRelation: "screenplay_seasons"
            referencedColumns: ["slug"]
          },
        ]
      }
      screenplay_contributions: {
        Row: {
          ai_draft: string | null
          beat_id: string | null
          contributor_email: string | null
          contributor_name: string
          created_at: string
          final_body: string | null
          id: string
          kind: string
          media_url: string | null
          pitch: string
          reviewed_at: string | null
          reviewer_note: string | null
          season_slug: string | null
          status: string
        }
        Insert: {
          ai_draft?: string | null
          beat_id?: string | null
          contributor_email?: string | null
          contributor_name: string
          created_at?: string
          final_body?: string | null
          id?: string
          kind?: string
          media_url?: string | null
          pitch: string
          reviewed_at?: string | null
          reviewer_note?: string | null
          season_slug?: string | null
          status?: string
        }
        Update: {
          ai_draft?: string | null
          beat_id?: string | null
          contributor_email?: string | null
          contributor_name?: string
          created_at?: string
          final_body?: string | null
          id?: string
          kind?: string
          media_url?: string | null
          pitch?: string
          reviewed_at?: string | null
          reviewer_note?: string | null
          season_slug?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "screenplay_contributions_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "screenplay_beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenplay_contributions_season_slug_fkey"
            columns: ["season_slug"]
            isOneToOne: false
            referencedRelation: "screenplay_seasons"
            referencedColumns: ["slug"]
          },
        ]
      }
      screenplay_seasons: {
        Row: {
          created_at: string
          era: string
          honesty_note: string
          intro_markdown: string
          logline: string
          number: number
          published: boolean
          slug: string
          status: string
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          era?: string
          honesty_note?: string
          intro_markdown?: string
          logline?: string
          number: number
          published?: boolean
          slug: string
          status?: string
          subtitle?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          era?: string
          honesty_note?: string
          intro_markdown?: string
          logline?: string
          number?: number
          published?: boolean
          slug?: string
          status?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_page_views: {
        Row: {
          country: string | null
          created_at: string
          device: string | null
          id: number
          is_new_session: boolean
          path: string
          referrer_host: string | null
          session_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          device?: string | null
          id?: number
          is_new_session?: boolean
          path: string
          referrer_host?: string | null
          session_id: string
        }
        Update: {
          country?: string | null
          created_at?: string
          device?: string | null
          id?: number
          is_new_session?: boolean
          path?: string
          referrer_host?: string | null
          session_id?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      zoom_calls: {
        Row: {
          call_date: string
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          slug: string
          status: string
          summary: string | null
          telegram_notified_at: string | null
          thumbnail_url: string | null
          title: string
          transcript: string | null
          updated_at: string
          video_cid: string | null
        }
        Insert: {
          call_date: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          slug: string
          status?: string
          summary?: string | null
          telegram_notified_at?: string | null
          thumbnail_url?: string | null
          title: string
          transcript?: string | null
          updated_at?: string
          video_cid?: string | null
        }
        Update: {
          call_date?: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          slug?: string
          status?: string
          summary?: string | null
          telegram_notified_at?: string | null
          thumbnail_url?: string | null
          title?: string
          transcript?: string | null
          updated_at?: string
          video_cid?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      site_stats_breakdown: {
        Args: { _days?: number; _dimension: string; _limit?: number }
        Returns: {
          label: string
          value: number
        }[]
      }
      site_stats_daily: {
        Args: { _days?: number }
        Returns: {
          day: string
          pageviews: number
          visitors: number
        }[]
      }
      site_stats_totals: {
        Args: { _days?: number }
        Returns: {
          countries: number
          pages: number
          pageviews: number
          visitors: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
