import { ServiceView, serviceMetadata } from '@/views/service'

export const metadata = serviceMetadata('individualnye-konsultacii')
export const revalidate = 3600

export default function Page() {
  return <ServiceView slug="individualnye-konsultacii" />
}
