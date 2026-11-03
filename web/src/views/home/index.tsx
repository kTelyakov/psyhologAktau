import { BioSection } from '@/widgets/bio'
import { ContactsSection } from '@/widgets/contacts'
import { CtaBanner } from '@/widgets/cta'
import { FaqSection } from '@/widgets/faq'
import { HeroSection } from '@/widgets/hero'
import { PhotoReportsSection } from '@/widgets/photo-reports'
import { ServicesSection } from '@/widgets/services'
import { TestimonialsSection } from '@/widgets/testimonials'
import { TvSection } from '@/widgets/tv'

import { LatestPosts } from './LatestPosts'

export function HomeView() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BioSection />
      <TvSection />
      <TestimonialsSection />
      <CtaBanner />
      <FaqSection />
      <PhotoReportsSection />
      <LatestPosts />
      <ContactsSection />
    </>
  )
}
