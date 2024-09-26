export default function FormPreview({ details, name, t, role }) {
  return (
    <dl>
      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-themeColor-500">
        {t("previewForm.name")}
      </dt>
      <dd className="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-300">
        {name}
      </dd>
      <dt>
        <dt className="mb-4 font-semibold leading-none text-gray-900 dark:text-themeColor-500">
          {t("previewForm.detailsHead")}
        </dt>
        <dt className="grid grid-cols-1 md:grid-cols-2 gap-x-3 text-gray-900 dark:text-gray-300">
          {details.map((detail, index) => (
            <dt className="flex gap-2 items-start mb-3" key={index}>
              <dd className="!text-base font-medium">{detail.head}</dd>
              <dd className="!text-base font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                {detail.value}
              </dd>
            </dt>
          ))}
        </dt>
      </dt>
      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-themeColor-500">
        {role ? t("previewForm.job") : ""}
      </dt>
      <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
        {role}
      </dd>
    </dl>
  );
}
