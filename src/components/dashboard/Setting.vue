<template>
  <div
    class="p-4 sm:p-6 bg-slate-50 min-h-screen font-sans antialiased text-slate-800"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">
          Management Center
        </h2>
        <p class="text-sm text-slate-500 mt-1">
          Configure your hotel's operational parameters, security, and staff
          permissions.
        </p>
      </div>

      <!-- Profile Information -->
      <div
        class="bg-white rounded-2xl border border-slate-200/70 shadow-sm mt-6 p-6"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-slate-800">
                Profile Information
              </h3>
              <p class="text-sm text-slate-400 mt-0.5">
                Manage your personal administrative identity.
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="saveProfile"
            class="shrink-0 text-sm font-medium text-white bg-emerald-800 px-4 py-2.5 rounded-xl shadow-sm hover:bg-emerald-900 transition-colors whitespace-nowrap"
          >
            Save Changes
          </button>
        </div>

        <div class="grid grid-cols-2 gap-5 mt-6">
          <div>
            <label
              class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
            >
              Full Name
            </label>
            <input
              v-model="form.fullName"
              type="text"
              class="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
            />
          </div>
          <div>
            <label
              class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
            >
              Email Address
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
            />
          </div>
          <div>
            <label
              class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
            >
              Role
            </label>
            <div class="relative">
              <div
                class="w-full text-sm font-medium text-slate-500 bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 cursor-not-allowed"
              >
                {{ form.role }}
              </div>
              <svg
                class="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-6 9v-1a6 6 0 016-6 6 6 0 016 6v1M16 11V9a2 2 0 10-4 0"
                />
              </svg>
            </div>
          </div>
          <div>
            <label
              class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
            >
              Timezone
            </label>
            <div class="relative">
              <select
                v-model="form.timezone"
                class="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
              >
                <option v-for="tz in timezoneOptions" :key="tz" :value="tz">
                  {{ tz }}
                </option>
              </select>
              <svg
                class="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert Preferences -->
      <div
        class="bg-white rounded-2xl border border-slate-200/70 shadow-sm mt-5 p-6"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-800">
              Alert Preferences
            </h3>
            <p class="text-sm text-slate-400 mt-0.5">
              Stay updated on hotel activities via email and system alerts.
            </p>
          </div>
        </div>

        <div class="mt-5 divide-y divide-slate-100">
          <div
            v-for="alert in preferences"
            :key="alert.id"
            class="flex items-center justify-between gap-4 py-4 first:pt-5"
          >
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 mt-0.5 text-slate-400 shrink-0">
                <component :is="alertIcon(alert.id)" />
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-700">
                  {{ alert.label }}
                </p>
                <p class="text-xs text-slate-400 mt-0.5">
                  {{ alert.description }}
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              :aria-checked="alert.enabled"
              @click="alert.enabled = !alert.enabled"
              :class="[
                'relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200',
                alert.enabled ? 'bg-emerald-700' : 'bg-slate-200',
              ]"
            >
              <span
                :class="[
                  'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                  alert.enabled ? 'translate-x-5' : 'translate-x-0',
                ]"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Security Center -->
      <div
        class="bg-white rounded-2xl border border-slate-200/70 shadow-sm mt-5 p-6"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-800">
              Security Center
            </h3>
            <p class="text-sm text-slate-400 mt-0.5">
              Manage your account protection and active access sessions.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-5">
          <button
            type="button"
            class="flex items-center justify-between gap-3 text-left bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:bg-slate-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <svg
                class="w-4.5 h-4.5 text-slate-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 11-12 0 6 6 0 0112 0zM3 21l6.5-6.5"
                />
              </svg>
              <div>
                <p class="text-sm font-semibold text-slate-700">
                  Change Password
                </p>
                <p class="text-xs text-slate-400 mt-0.5">
                  Security last updated {{ security.passwordLastUpdated }}
                </p>
              </div>
            </div>
            <svg
              class="w-4 h-4 text-slate-300 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            class="flex items-center justify-between gap-3 bg-emerald-50/60 border border-emerald-100 rounded-xl px-4 py-3.5"
          >
            <div class="flex items-center gap-3">
              <svg
                class="w-4.5 h-4.5 text-emerald-600 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"
                />
              </svg>
              <div>
                <p class="text-sm font-semibold text-slate-700">
                  Two-Factor Auth
                </p>
                <p class="text-xs text-emerald-600 mt-0.5">
                  Enabled ({{ security.twoFactorMethod }})
                </p>
              </div>
            </div>
            <svg
              class="w-4.5 h-4.5 text-emerald-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" stroke-width="1.8" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>
        </div>

        <div
          class="flex items-center justify-between gap-4 mt-5 pt-5 border-t border-slate-100"
        >
          <div>
            <p class="text-sm font-semibold text-slate-700">Active Sessions</p>
            <p class="text-xs text-slate-400 mt-0.5">
              Logged in on {{ security.activeSessionsCount }} devices
              {{ security.activeSessionsNote }}
            </p>
          </div>
          <button
            type="button"
            @click="revokeSessions"
            class="shrink-0 text-sm font-medium text-rose-600 bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors whitespace-nowrap"
          >
            Revoke All Active Sessions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, reactive } from "vue";

// --- Mock data (inline — swap for a real API call later) ---
const profile = {
  fullName: "Alex Rivera",
  email: "alex.rivera@grandplaza.com",
  role: "General Manager (Admin)",
  timezone: "Eastern Standard Time (EST)",
};

const timezoneOptions = [
  "Eastern Standard Time (EST)",
  "Central Standard Time (CST)",
  "Mountain Standard Time (MST)",
  "Pacific Standard Time (PST)",
  "Greenwich Mean Time (GMT)",
];

const alertPreferences = [
  {
    id: "newBookingEmails",
    label: "New Booking Emails",
    description: "Instant notification for every new reservation confirmed",
    enabled: true,
  },
  {
    id: "dailySummaryReport",
    label: "Daily Summary Report",
    description: "Automated management report sent every morning at 6:00 AM",
    enabled: false,
  },
  {
    id: "securityAlerts",
    label: "Security Alerts",
    description:
      "Critical notifications for unusual login activity or system changes",
    enabled: true,
  },
];

const security = {
  passwordLastUpdated: "3 months ago",
  twoFactorEnabled: true,
  twoFactorMethod: "SMS/Email",
  activeSessionsCount: 2,
  activeSessionsNote: "(this browser and iOS app)",
};

// --- Profile form state ---
const form = reactive({ ...profile });

function saveProfile() {
  // Wire this up to a real API call later.
  console.log("Saving profile:", { ...form });
}

// --- Alert preference toggles ---
const preferences = reactive(alertPreferences.map((pref) => ({ ...pref })));

// --- Security actions ---
function revokeSessions() {
  // Wire this up to a real API call later.
  console.log("Revoking all active sessions");
}

// --- Small inline icons per alert row ---
const MailIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.8",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      }),
    ],
  );
const DocumentIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.8",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM9 12h6m-6 4h6",
      }),
    ],
  );
const ShieldIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.8",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
      }),
    ],
  );

const alertIconMap = {
  newBookingEmails: MailIcon,
  dailySummaryReport: DocumentIcon,
  securityAlerts: ShieldIcon,
};

function alertIcon(id) {
  return alertIconMap[id] ?? MailIcon;
}
</script>
