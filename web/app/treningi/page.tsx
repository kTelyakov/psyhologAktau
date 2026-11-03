import { ServiceView, serviceMetadata } from '@/views/service'

export const metadata = serviceMetadata('treningi')
export const revalidate = 3600

export default function Page() {
  return <ServiceView slug="treningi" />
}
