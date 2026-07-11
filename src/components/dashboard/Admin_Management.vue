<template>
  <div class="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.2em] text-teal-700">Team access</p>
          <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950">Hotel administrators</h2>
          <p class="mt-1 text-sm text-slate-500">{{ isSuperAdmin ? "Create and assign administrators across every hotel." : `Manage dashboard access for ${hotel?.name || "your hotel"}.` }}</p>
        </div>
        <button class="rounded-xl bg-teal-800 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-teal-900" @click="openCreate">+ Add administrator</button>
      </div>

      <div v-if="message" class="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{{ message }}</div>
      <div v-if="generatedCredentials" class="mt-5 rounded-2xl border border-teal-200 bg-teal-50 p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div><p class="text-xs font-bold uppercase tracking-widest text-teal-700">New admin credentials</p><p class="mt-1 text-sm text-teal-900">Copy these details now. The temporary password is only displayed once.</p></div>
          <button class="rounded-lg border border-teal-300 bg-white px-3 py-2 text-xs font-bold text-teal-800" @click="copyCredentials">{{ copied ? "Copied" : "Copy credentials" }}</button>
        </div>
        <div class="mt-4 grid gap-3 sm:grid-cols-2"><div class="rounded-xl bg-white p-3"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Generated Gmail</p><p class="mt-1 break-all font-mono text-sm font-bold text-slate-800">{{ generatedCredentials.email }}</p></div><div class="rounded-xl bg-white p-3"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Temporary password</p><p class="mt-1 break-all font-mono text-sm font-bold text-slate-800">{{ generatedCredentials.temporary_password }}</p></div></div>
      </div>
      <div v-if="error" class="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{{ error }}</div>

      <div class="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div v-if="loading" class="p-10 text-center text-sm text-slate-500">Loading administrators...</div>
        <div v-else-if="!admins.length" class="p-10 text-center text-sm text-slate-500">No administrators have been assigned to this hotel.</div>
        <div v-else class="divide-y divide-slate-100">
          <div v-for="admin in admins" :key="admin.id" class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex min-w-0 items-center gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">{{ initials(admin.name) }}</div>
              <div class="min-w-0"><p class="truncate font-semibold text-slate-900">{{ admin.name }}</p><p class="truncate text-sm text-slate-500">{{ admin.email }}</p><p v-if="isSuperAdmin" class="mt-1 text-xs font-semibold text-teal-700">{{ admin.hotel?.name || "No hotel assigned" }}</p></div>
              <span v-if="admin.role === 'super_admin'" class="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">Super admin</span><span v-if="admin.id === currentUser?.id" class="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">You</span>
            </div>
            <div class="flex gap-2">
              <button class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-teal-500 hover:text-teal-700" @click="openEdit(admin)">Edit</button>
              <button :disabled="admin.id === currentUser?.id" class="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40" @click="removeAdmin(admin)">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="closeModal">
      <form class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7" @submit.prevent="saveAdmin">
        <div class="flex items-start justify-between"><div><p class="text-xs font-bold uppercase tracking-widest text-teal-700">{{ editing ? "Update access" : "New team member" }}</p><h3 class="mt-2 text-xl font-bold">{{ editing ? "Edit administrator" : "Add administrator" }}</h3></div><button type="button" class="text-2xl text-slate-400 hover:text-slate-700" @click="closeModal">×</button></div>
        <div class="mt-6 space-y-4">
          <label class="block"><span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Full name</span><input v-model.trim="form.name" required class="field" placeholder="Administrator name" /></label>
          <label v-if="editing" class="block"><span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Email address</span><input v-model.trim="form.email" required type="email" class="field" placeholder="admin@hotel.com" /></label>
          <label v-if="isSuperAdmin" class="block"><span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Assigned hotel</span><select v-model="form.hotel_id" required class="field"><option value="" disabled>Select a hotel</option><option v-for="item in hotels" :key="item.id" :value="item.id">{{ item.name }} — {{ item.location }}</option></select></label>
          <label v-if="editing" class="block"><span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">New password (optional)</span><input v-model="form.password" type="password" minlength="8" class="field" placeholder="At least 8 characters" /></label>
          <label v-if="editing && form.password" class="block"><span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Confirm password</span><input v-model="form.password_confirmation" required type="password" minlength="8" class="field" placeholder="Repeat password" /></label>
          <p v-if="!editing" class="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">A unique Gmail login and secure temporary password will be generated automatically.</p>
        </div>
        <div class="mt-7 flex justify-end gap-3"><button type="button" class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600" @click="closeModal">Cancel</button><button :disabled="saving" class="rounded-xl bg-teal-800 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{{ saving ? "Saving..." : editing ? "Save changes" : "Create admin" }}</button></div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { adminApi } from "../../service/api/client.js";
import { useAuth } from "../../service/auth.js";

const currentUser = useAuth().user;
const admins = ref([]); const hotel = ref(null); const hotels = ref([]); const isSuperAdmin = ref(false); const loading = ref(true); const saving = ref(false);
const modalOpen = ref(false); const editing = ref(null); const error = ref(""); const message = ref("");
const generatedCredentials = ref(null); const copied = ref(false);
const form = reactive({ name: "", email: "", hotel_id: "", password: "", password_confirmation: "" });

async function loadAdmins() { loading.value = true; error.value = ""; try { const data = await adminApi.hotelAdmins(); admins.value = data.admins || []; hotel.value = data.hotel; hotels.value = data.hotels || []; isSuperAdmin.value = Boolean(data.is_super_admin); } catch (e) { error.value = e.message; } finally { loading.value = false; } }
function resetForm() { Object.assign(form, { name: "", email: "", hotel_id: "", password: "", password_confirmation: "" }); }
function openCreate() { editing.value = null; resetForm(); modalOpen.value = true; }
function openEdit(admin) { editing.value = admin; Object.assign(form, { name: admin.name, email: admin.email, hotel_id: admin.hotel_id || "", password: "", password_confirmation: "" }); modalOpen.value = true; }
function closeModal() { modalOpen.value = false; editing.value = null; resetForm(); }
async function saveAdmin() { error.value = ""; message.value = ""; if (editing.value && form.password !== form.password_confirmation) { error.value = "Passwords do not match."; return; } saving.value = true; try { let payload; if (editing.value) { payload = { ...form }; if (!isSuperAdmin.value) delete payload.hotel_id; if (!payload.password) { delete payload.password; delete payload.password_confirmation; } } else { payload = { name: form.name, ...(isSuperAdmin.value ? { hotel_id: form.hotel_id } : {}) }; } const data = editing.value ? await adminApi.updateHotelAdmin(editing.value.id, payload) : await adminApi.createHotelAdmin(payload); message.value = data.message; generatedCredentials.value = data.credentials || null; copied.value = false; closeModal(); await loadAdmins(); } catch (e) { error.value = e.message; } finally { saving.value = false; } }
async function copyCredentials() { if (!generatedCredentials.value) return; const text = `StayEasy admin login\nEmail: ${generatedCredentials.value.email}\nTemporary password: ${generatedCredentials.value.temporary_password}`; await navigator.clipboard.writeText(text); copied.value = true; }
async function removeAdmin(admin) { if (!confirm(`Remove ${admin.name} from this hotel's administrators?`)) return; error.value = ""; try { const data = await adminApi.deleteHotelAdmin(admin.id); message.value = data.message; await loadAdmins(); } catch (e) { error.value = e.message; } }
function initials(name = "") { return name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase(); }
onMounted(loadAdmins);
</script>

<style scoped>
.field { width: 100%; border-radius: .75rem; border: 1px solid #e2e8f0; padding: .75rem 1rem; font-size: .875rem; outline: none; }
.field:focus { border-color: #0d9488; box-shadow: 0 0 0 4px #ccfbf1; }
</style>
