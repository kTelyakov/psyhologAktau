import { ServiceView, serviceMetadata } from '@/views/service'

export const metadata = serviceMetadata('trudnye-podrostki')
export const revalidate = 3600

export default function Page() {
  return <ServiceView slug="trudnye-podrostki" />
}
