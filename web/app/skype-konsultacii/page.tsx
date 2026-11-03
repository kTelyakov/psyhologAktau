import { ServiceView, serviceMetadata } from '@/views/service'

export const metadata = serviceMetadata('skype-konsultacii')
export const revalidate = 3600

export default function Page() {
  return <ServiceView slug="skype-konsultacii" />
}
