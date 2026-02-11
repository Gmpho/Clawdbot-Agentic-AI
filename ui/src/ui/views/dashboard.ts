import { html } from "lit";
import { formatRelativeTimestamp } from "../format.ts";
import { normalizeBasePath } from "../navigation.ts";

export type DashboardProps = {
  connected: boolean;
  assistantName: string;
  presenceCount: number;
  sessionsCount: number | null;
  cronEnabled: boolean | null;
  cronNext: number | null;
  basePath: string;
  onJumpToChat: () => void;
  onJumpToChannels: () => void;
  onJumpToCron: () => void;
};

export function renderDashboard(props: DashboardProps) {
  const basePath = normalizeBasePath(props.basePath);
  const horseImage = basePath ? `${basePath}/horse-track.svg` : "/horse-track.svg";
  const momentumStatus = props.connected ? "Live market pulse" : "Waiting on gateway connection";

  return html`
    <section class="dashboard-hero card">
      <div class="dashboard-hero__copy">
        <div class="card-title">${props.assistantName}</div>
        <div class="card-sub">
          Your command center for horse-racing insights, watchlist triggers, and confident daily briefs.
        </div>
        <div class="dashboard-hero__chips" style="margin-top: 14px;">
          <span class="pill">💸 Value Spotter</span>
          <span class="pill">🏇 Pace View</span>
          <span class="pill">📣 Alert Ready</span>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${props.onJumpToChat}>Open Racing Chat</button>
          <button class="btn" @click=${props.onJumpToChannels}>Configure Channels</button>
          <button class="btn" @click=${props.onJumpToCron}>Schedule Heartbeat</button>
        </div>
      </div>
      <div class="dashboard-hero__media">
        <img src=${horseImage} alt="Stylized horse racing banner" />
      </div>
    </section>

    <section class="grid grid-cols-3" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">Gateway</div>
        <div class="stat-value ${props.connected ? "ok" : "warn"}">
          ${props.connected ? "Connected" : "Offline"}
        </div>
        <div class="muted">${momentumStatus}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Live Instances</div>
        <div class="stat-value">${props.presenceCount}</div>
        <div class="muted">Systems reporting in during the last 5 minutes.</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Tracked Sessions</div>
        <div class="stat-value">${props.sessionsCount ?? "n/a"}</div>
        <div class="muted">Active racing conversations being monitored.</div>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <div class="card">
        <div class="card-title">Today's plan</div>
        <div class="note-grid" style="margin-top: 14px;">
          <div>
            <div class="note-title">Morning card pull</div>
            <div class="muted">Load race cards before markets move.</div>
          </div>
          <div>
            <div class="note-title">Pre-race watchlist</div>
            <div class="muted">Highlight runners with pace + form alignment.</div>
          </div>
          <div>
            <div class="note-title">Risk-aware briefs</div>
            <div class="muted">Share confidence bands and uncertainty notes.</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Heartbeat status</div>
        <div class="card-sub">Automation for race previews and reminders.</div>
        <div class="stat-grid" style="margin-top: 14px;">
          <div class="stat">
            <div class="stat-label">Cron</div>
            <div class="stat-value">
              ${props.cronEnabled == null ? "n/a" : props.cronEnabled ? "Enabled" : "Disabled"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${props.cronNext ? formatRelativeTimestamp(props.cronNext) : "n/a"}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
