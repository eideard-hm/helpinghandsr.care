export function Services() {
  return (
    <section
      id='services'
      className='py-20 bg-gray-50 container mx-auto px-4  max-w-7xl'
    >
      <h2 className='text-3xl font-bold mb-8'>Our Services</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold mb-4'>Service 1</h3>
          <p className='text-gray-600'>Description of service 1.</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold mb-4'>Service 2</h3>
          <p className='text-gray-600'>Description of service 2.</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold mb-4'>Service 3</h3>
          <p className='text-gray-600'>Description of service 3.</p>
        </div>
      </div>
    </section>
  );
}
