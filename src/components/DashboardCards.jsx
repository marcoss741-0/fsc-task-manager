const DashboardCards = ({ mainText, secText, icon }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 rounded-lg bg-white h-[150px]">
        <div className="flex items-center gap-2">
          <span className="text-brand-primary">{icon}</span>
          <p className="font-semibold text-3xl text-brand-dark-blue leading-10">
            {mainText}
          </p>
        </div>
        <p className="text-md text-brand-dark-blue">{secText}</p>
      </div>
    </>
  );
};

export default DashboardCards;
