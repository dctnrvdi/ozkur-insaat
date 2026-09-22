"use client";

import { useActionState, useState } from "react";
import Uploader from "./Uploader";
import RepeatableFields from "./RepeatableFields";
import type { SiteContent } from "@prisma/client";

type StatItem = { label: string; value: string };
type ServiceItem = { title: string; desc: string };
type ValueItem = { title: string; desc: string };

export default function SiteContentForm({
  content,
  action,
}: {
  content: SiteContent;
  action: (
    prevState: { success?: boolean } | undefined,
    formData: FormData
  ) => Promise<{ success?: boolean }>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [heroImage, setHeroImage] = useState(content.heroImage);
  const [heroVideo, setHeroVideo] = useState(content.heroVideo);
  const [logo, setLogo] = useState(content.logo);
  const [aboutImage, setAboutImage] = useState(content.aboutImage);
  const [stats, setStats] = useState<StatItem[]>((content.stats as StatItem[]) ?? []);
  const [services, setServices] = useState<ServiceItem[]>((content.services as ServiceItem[]) ?? []);
  const [values, setValues] = useState<ValueItem[]>((content.values as ValueItem[]) ?? []);

  return (
    <form action={formAction} className="space-y-16">
      <input type="hidden" name="heroImage" value={heroImage} />
      <input type="hidden" name="heroVideo" value={heroVideo} />
      <input type="hidden" name="logo" value={logo} />
      <input type="hidden" name="aboutImage" value={aboutImage} />

      <section>
        <h2 className="font-display font-bold text-xl mb-6">Logo</h2>
        <div className="space-y-5">
          <Uploader value={logo} onChange={setLogo} accept="image/*" label={`Site Logosu (boş bırakılırsa "Özkur İnşaat" yazısı gösterilir)`} />
        </div>
      </section>

      <section>
        <h2 className="font-display font-bold text-xl mb-6">Anasayfa — Hero</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <input
              name="heroTitle"
              defaultValue={content.heroTitle}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alt Metin</label>
            <textarea
              name="heroSubtitle"
              rows={2}
              defaultValue={content.heroSubtitle}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent resize-none"
            />
          </div>
          <Uploader value={heroImage} onChange={setHeroImage} accept="image/*" label="Hero Görseli" />
          <Uploader value={heroVideo} onChange={setHeroVideo} accept="video/*" label="Hero Videosu (opsiyonel, yüklenirse görselin yerine gösterilir)" />
        </div>
      </section>

      <section>
        <h2 className="font-display font-bold text-xl mb-6">Anasayfa — İstatistikler</h2>
        <RepeatableFields<StatItem>
          name="stats"
          items={stats}
          onChange={setStats}
          fields={[
            { key: "value", label: "Değer (örn. 15+)" },
            { key: "label", label: "Etiket (örn. Yıllık Tecrübe)" },
          ]}
          addLabel="İstatistik Ekle"
        />
      </section>

      <section>
        <h2 className="font-display font-bold text-xl mb-6">Hizmetler</h2>
        <RepeatableFields<ServiceItem>
          name="services"
          items={services}
          onChange={setServices}
          fields={[
            { key: "title", label: "Başlık" },
            { key: "desc", label: "Açıklama", multiline: true },
          ]}
          addLabel="Hizmet Ekle"
        />
      </section>

      <section>
        <h2 className="font-display font-bold text-xl mb-6">Hakkımızda</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <input
              name="aboutTitle"
              defaultValue={content.aboutTitle}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hikayemiz</label>
            <textarea
              name="aboutIntro"
              rows={4}
              defaultValue={content.aboutIntro}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Misyonumuz</label>
            <textarea
              name="aboutMission"
              rows={4}
              defaultValue={content.aboutMission}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <Uploader value={aboutImage} onChange={setAboutImage} accept="image/*" label="Kurumsal Görsel" />
        </div>
      </section>

      <section>
        <h2 className="font-display font-bold text-xl mb-6">Değerlerimiz</h2>
        <RepeatableFields<ValueItem>
          name="values"
          items={values}
          onChange={setValues}
          fields={[
            { key: "title", label: "Başlık" },
            { key: "desc", label: "Açıklama", multiline: true },
          ]}
          addLabel="Değer Ekle"
        />
      </section>

      <section>
        <h2 className="font-display font-bold text-xl mb-6">İletişim Bilgileri</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Telefon</label>
            <input
              name="contactPhone"
              defaultValue={content.contactPhone}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">E-posta</label>
            <input
              name="contactEmail"
              defaultValue={content.contactEmail}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Adres</label>
            <input
              name="contactAddress"
              defaultValue={content.contactAddress}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Çalışma Saatleri</label>
            <input
              name="contactHours"
              defaultValue={content.contactHours}
              className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-pill bg-foreground text-background px-7 py-3.5 text-sm font-semibold disabled:opacity-50"
        >
          {pending && (
            <span className="h-4 w-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
          )}
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {state?.success && !pending && (
          <span className="text-sm text-green-600 font-medium">
            Kaydedildi ✓
          </span>
        )}
      </div>
    </form>
  );
}
