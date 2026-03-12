export default function Section({ children, className = '', id, as: Tag = 'section' }) {
  return (
    <Tag id={id} className={`py-16 lg:py-24 ${className}`}>
      {children}
    </Tag>
  )
}
