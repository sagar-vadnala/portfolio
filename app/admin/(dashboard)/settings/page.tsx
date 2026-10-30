import { getAdminSettings } from "@/lib/admin/queries";
import { saveSettings } from "@/lib/admin/actions/profile";
import { CheckboxField, SaveButton } from "@/components/admin/form/Fields";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Settings</h1>

      <form action={saveSettings} className="space-y-5 max-w-md card-surface rounded-2xl p-6">
        <CheckboxField
          label={'Show the hero proof line chips (e.g. "Real-time systems · Cross-platform mobile")'}
          name="heroProofLineVisible"
          defaultChecked={settings?.heroProofLineVisible ?? true}
        />
        <SaveButton label="Save settings" />
      </form>
    </div>
  );
}
