
import {
  UserRound,
  Settings,
  HardDrive,
  Info,
  ShieldCheck,
} from 'lucide-react'

interface ProfileMenuProps {
  onSettingsClick: () => void
  onClose: () => void
}

export default function ProfileMenu({
  onSettingsClick,
  onClose,
}: ProfileMenuProps) {
  const openSettings = () => {
    onSettingsClick()
    onClose()
  }

  return (
    <section
      aria-label="Workspace profile"
      className="absolute right-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-700 bg-[#151f32] p-4 shadow-2xl"
    >
      <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
        <div className="rounded-full bg-indigo-500/15 p-3 text-indigo-300">
          <UserRound size={25} />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Guest Workspace
          </h3>

          <p className="text-xs text-slate-400">
            Local browser session
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-start gap-3">
          <HardDrive
            size={18}
            className="mt-0.5 shrink-0 text-indigo-400"
          />

          <div>
            <p className="text-sm font-medium text-white">
              Local Storage
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Your projects are saved in this browser.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-sm font-medium text-white">
              No Account Required
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Sign-in and cloud sync are not enabled.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openSettings}
          className="flex w-full items-center gap-3 rounded-xl border border-slate-700 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-700"
        >
          <Settings size={18} />
          Workspace Settings
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4">
        <Info
          size={16}
          className="mt-0.5 shrink-0 text-slate-500"
        />

        <p className="text-xs leading-5 text-slate-400">
          Export a JSON backup in Settings before clearing
          your browser data.
        </p>
      </div>
    </section>
  )
}
