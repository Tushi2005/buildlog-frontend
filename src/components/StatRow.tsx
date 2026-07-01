export default function StatRow({ name }: { name: string }) {
  return <>
    <label htmlFor={name}>{name}
      <input type="text" id={name} />
    </label>
  </>
}