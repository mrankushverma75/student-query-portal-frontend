
const index = (params) => {
  return (
    <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${params?.width ?? params?.width}`}
        onClick={params.onClick}
        disabled={params.disabled}
        type="submit"
      >
        {params?.name ?? "Submit"}
      </button>
  )
}

export default index