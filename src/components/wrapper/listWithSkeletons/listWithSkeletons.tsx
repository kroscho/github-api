import { useSleep } from "@/utils";
import { Skeleton, Stack } from "@mui/material";
import { FC, ReactNode } from "react";

interface ListWithSkeletonsProps {
  children: ReactNode;
  isLoading: boolean;
}

export const ListWithSkeletons: FC<ListWithSkeletonsProps> = ({
  children,
  isLoading,
}) => {
  const isSleep = useSleep(300);

  const renderLoadingSkeletons = () => (
    <Stack direction="column" spacing={2}>
      <Skeleton variant="rounded" height={60} animation="wave" />
      <Skeleton variant="rounded" height={60} animation="wave" />
      <Skeleton variant="rounded" height={60} animation="wave" />
    </Stack>
  );

  const loading = isLoading || isSleep;

  return <>{loading ? renderLoadingSkeletons() : children}</>;
};
