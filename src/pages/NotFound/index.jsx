import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gray-50">
      <Container className="text-center py-24">
        <p className="text-9xl font-black text-gray-200 mb-4 select-none">404</p>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button to="/" size="lg">
          Back to Home
        </Button>
      </Container>
    </div>
  )
}
