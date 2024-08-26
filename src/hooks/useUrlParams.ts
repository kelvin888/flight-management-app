import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParam = (paramName: string, paramValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (paramValue) {
      params.set(paramName, paramValue);
    } else {
      params.delete(paramName);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { updateSearchParam };
};
