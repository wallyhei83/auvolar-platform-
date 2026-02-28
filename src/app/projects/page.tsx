import { redirect } from 'next/navigation'

// /projects redirects to /case-studies (unified page)
export default function ProjectsPage() {
  redirect('/case-studies')
}
