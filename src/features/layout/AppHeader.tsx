export const AppHeader = () => {
  return (
    <header className='sticky z-header top-0 flex items-center justify-between bg-gray-300 h-11 px-4 py-1.5'>
      <div className='flex items-center gap-4'>
        {/* <AppSidebarButton /> */}
        <img
          src='https://cdn.prod.website-files.com/67518d4f9d25de09cbcd2d4f/67518d4f9d25de09cbcd2d62_opensend-logo.svg'
          alt='logo'
          className='h-7'
        />
      </div>
    </header>
  );
};
