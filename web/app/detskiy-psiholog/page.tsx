import { ServiceView, serviceMetadata } from '@/views/service'

export const metadata = serviceMetadata('detskiy-psiholog')
export const revalidate = 3600

export default function Page() {
  return <ServiceView slug="detskiy-psiholog" />
}
