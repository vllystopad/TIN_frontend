import { Card, CardContent, Skeleton, Box } from "@mui/material";

export const ServiceCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box flex={1}>
            <Skeleton variant="text" width="50%" height={32} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
            <Box display="flex" gap={2} mt={2}>
              <Skeleton variant="rounded" width={120} height={24} />
              <Skeleton variant="text" width={60} height={32} />
            </Box>
          </Box>
          <Skeleton variant="circular" width={42} height={42} />
        </Box>
      </CardContent>
    </Card>
  );
};

