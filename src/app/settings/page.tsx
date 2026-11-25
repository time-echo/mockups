"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { useFlash } from "@/components/ui/FlashBanner";
import { GoogleMark } from "@/components/ui/SocialAuthButtons";
import {
  Mail,
  Lock,
  Link2,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

const SUPPORTED_PROVIDERS = [
  { id: "google", label: "Google" },
  // Facebook login temporarily disabled:
  // { id: "facebook", label: "Facebook" },
] as const;

interface SettingsPageProps {
  initialHasPassword?: boolean;
  initialGoogleLinked?: boolean;
}

export default function SettingsPage({
  initialHasPassword = true,
  initialGoogleLinked = true,
}: SettingsPageProps = {}) {
  const router = useRouter();
  const { resetVault, t } = useTimeEcho();
  const { notice, alert } = useFlash();

  const [email, setEmail] = useState("user@timeecho.me");
  const [savedNotice, setSavedNotice] = useState(false);

  const [hasPassword, setHasPassword] = useState(initialHasPassword);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [linkedProviders, setLinkedProviders] = useState<string[]>(
    initialGoogleLinked ? ["google"] : [],
  );

  const canUnlink = (hasPassword ? 1 : 0) + linkedProviders.length > 1;

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    notice(t("settings.savedNotice"));
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 10) {
      alert(t("login.passwordTooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(t("login.passwordMismatch"));
      return;
    }
    setHasPassword(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    notice(t("settings.passwordUpdatedNotice"));
  };

  const handleToggleProvider = (provider: string, isLinked: boolean) => {
    if (isLinked) {
      if (!canUnlink) {
        alert(t("settings.cannotUnlinkHint"));
        return;
      }
      setLinkedProviders((prev) => prev.filter((p) => p !== provider));
      notice(t("settings.identityUnlinkedNotice"));
    } else {
      setLinkedProviders((prev) => [...prev, provider]);
      notice(t("settings.identityLinkedNotice"));
    }
  };

  const handleDeleteVault = async () => {
    const confirmed = window.confirm(t("settings.deleteConfirmPrompt"));
    if (confirmed) {
      await resetVault();
      router.push("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 font-ui pb-16 animate-fade-in text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-crease pb-6">
        <div className="space-y-1">
          <h1 className="font-serif-editorial text-3xl font-semibold text-foreground tracking-tight">
            {t("settings.title")}
          </h1>
          <p className="text-xs font-letter text-foreground-muted tracking-wider">
            {t("settings.subtitle")}
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-crease font-letter text-xs text-foreground uppercase tracking-wider hover:bg-manila/50 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft size={13} />
          <span>{t("settings.backToVault")}</span>
        </Link>
      </div>

      {savedNotice && (
        <div className="paper-sheet rounded-xs border border-crease bg-manila/30 p-3 text-xs font-letter text-foreground flex items-center gap-2">
          <CheckCircle size={13} className="text-ink shrink-0" />
          <span>{t("settings.savedNotice")}</span>
        </div>
      )}

      <div className="paper-sheet rounded-xs border border-crease p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-crease pb-3.5">
          <h2 className="font-serif-editorial text-xl font-semibold text-foreground flex items-center gap-2">
            <Mail size={18} className="text-ink" />
            <span>{t("settings.changeEmail")}</span>
          </h2>
        </div>

        <form onSubmit={handleUpdateEmail} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="settings-email"
              className="text-xs font-letter uppercase tracking-wider font-semibold text-foreground-muted block"
            >
              {t("settings.newEmail")}
            </label>
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full paper-sheet rounded-xs border border-crease px-4 py-2.5 font-letter text-xs text-foreground placeholder:text-foreground-muted focus:border-wax focus:outline-none transition-colors min-h-[44px]"
              placeholder="tu@email.com"
              required
            />
            <p className="text-[11px] font-letter text-foreground-muted leading-relaxed">
              {t("settings.emailDesc")}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-wax hover:bg-wax-hover text-on-wax rounded-xs py-3 px-8 text-xs font-semibold tracking-widest uppercase shadow-xs border-none cursor-pointer font-letter min-h-[44px] transition-colors"
          >
            {t("settings.updateEmail")}
          </button>
        </form>
      </div>

      <div className="paper-sheet rounded-xs border border-crease p-6 sm:p-8 space-y-6">
        <div className="border-b border-crease pb-3.5 space-y-1">
          <h2 className="font-serif-editorial text-xl font-semibold text-foreground flex items-center gap-2">
            <Lock size={18} className="text-ink" />
            <span>
              {hasPassword
                ? t("settings.passwordSectionTitle")
                : t("settings.setPasswordTitle")}
            </span>
          </h2>
          <p className="text-[11px] font-letter text-foreground-muted leading-relaxed">
            {hasPassword
              ? t("settings.passwordDesc")
              : t("settings.setPasswordDesc")}
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {hasPassword && (
            <div className="space-y-1.5">
              <label
                htmlFor="settings-current-password"
                className="text-xs font-letter uppercase tracking-wider font-semibold text-foreground-muted block"
              >
                {t("settings.currentPasswordLabel")}
              </label>
              <input
                id="settings-current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full paper-sheet rounded-xs border border-crease px-4 py-2.5 font-letter text-xs text-foreground focus:border-wax focus:outline-none min-h-[44px]"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="settings-new-password"
              className="text-xs font-letter uppercase tracking-wider font-semibold text-foreground-muted block"
            >
              {t("settings.newPasswordLabel")}
            </label>
            <input
              id="settings-new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={10}
              className="w-full paper-sheet rounded-xs border border-crease px-4 py-2.5 font-letter text-xs text-foreground focus:border-wax focus:outline-none min-h-[44px]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="settings-confirm-password"
              className="text-xs font-letter uppercase tracking-wider font-semibold text-foreground-muted block"
            >
              {t("settings.confirmPasswordLabel")}
            </label>
            <input
              id="settings-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={10}
              className="w-full paper-sheet rounded-xs border border-crease px-4 py-2.5 font-letter text-xs text-foreground focus:border-wax focus:outline-none min-h-[44px]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-wax hover:bg-wax-hover text-on-wax rounded-xs py-3 px-8 text-xs font-semibold tracking-widest uppercase shadow-xs border-none cursor-pointer font-letter min-h-[44px] transition-colors"
          >
            {hasPassword
              ? t("settings.updatePasswordButton")
              : t("settings.setPasswordButton")}
          </button>
        </form>
      </div>

      <div className="paper-sheet rounded-xs border border-crease p-6 sm:p-8 space-y-5">
        <div className="border-b border-crease pb-3.5 space-y-1">
          <h2 className="font-serif-editorial text-xl font-semibold text-foreground flex items-center gap-2">
            <Link2 size={18} className="text-ink" />
            <span>{t("settings.connectedAccountsTitle")}</span>
          </h2>
          <p className="text-[11px] font-letter text-foreground-muted leading-relaxed">
            {t("settings.connectedAccountsDesc")}
          </p>
        </div>

        <div className="divide-y divide-crease">
          {SUPPORTED_PROVIDERS.map(({ id, label }) => {
            const isLinked = linkedProviders.includes(id);
            return (
              <div
                key={id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <GoogleMark />
                  <div>
                    <p className="text-xs font-letter font-semibold text-foreground uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-[11px] font-letter text-foreground-muted">
                      {isLinked ? email : t("settings.notConnected")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleProvider(id, isLinked)}
                  disabled={isLinked && !canUnlink}
                  title={
                    isLinked && !canUnlink
                      ? t("settings.cannotUnlinkHint")
                      : undefined
                  }
                  className="border border-crease text-foreground hover:bg-manila/50 rounded-xs px-4 py-2 text-xs font-letter font-semibold uppercase tracking-wider min-h-[38px] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLinked ? t("settings.disconnect") : t("settings.connect")}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="archival-folder rounded-xs border border-wax/30 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-wax/20 pb-3 text-wax font-letter">
          <AlertTriangle size={18} />
          <h2 className="font-serif-editorial text-xl font-semibold text-wax">
            {t("settings.dangerZone")}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xs font-letter font-semibold uppercase tracking-wider text-wax">
              {t("settings.deleteVaultTitle")}
            </h3>
            <p className="text-xs font-letter text-foreground-muted leading-relaxed max-w-lg">
              {t("settings.deleteVaultDesc")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteVault}
            className="border border-wax/40 text-wax hover:bg-wax/10 rounded-xs cursor-pointer shrink-0 font-letter text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] px-5 whitespace-nowrap bg-transparent"
          >
            {t("settings.deleteVaultButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
