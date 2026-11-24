interface CounterProps {
  value: number
  total?: number
  label: string
  className?: string
}

// Viser en tæller med valgfrit samlet antal.
function Counter({
  value,
  total,
  label,
  className,
}: CounterProps) {
  return (
    <span className={className}>
      {value}
      {total !== undefined && ` / ${total}`}
      {' '}
      {label}
    </span>
  )
}

export default Counter
