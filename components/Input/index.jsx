
const index = (params) => {
  return (
    <input
        type={params.type}
        name={params?.name}
        placeholder={params?.placeholder}
        className={`p-2 border border-gray-300 bg-white rounded w-full ${params?.maxWidth ? params.maxWidth : 'max-w-80'} h-12 transition hover:outline-blue-600`}
        // value={params?.value}
        onChange={params.onChange}
      />
  )
}

export default index