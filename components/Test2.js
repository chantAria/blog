export default function Test() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((number) => (
        <div>{number}</div>
      ))}
    </div>
  )
}