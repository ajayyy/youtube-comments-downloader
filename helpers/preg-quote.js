export default function(str) {
  return str.replace(
    /[,.\/;'\\\[\]<>?:"|{}!@#$%^&*()_+]/g,
    '\\$&'
  )
}
