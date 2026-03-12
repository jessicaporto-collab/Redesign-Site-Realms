export default function Container({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  )
}
