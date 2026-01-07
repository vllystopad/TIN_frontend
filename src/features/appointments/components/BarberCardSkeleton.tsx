import { Card, CardContent, Skeleton, Box } from "@mui/material";

export const BarberCardSkeleton = () => {
    return (
        <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Box display="flex" gap={1} mt={2} mb={1}>
                    <Skeleton variant="rounded" width={100} height={24} />
                </Box>
                <Skeleton variant="text" width="40%" />
            </CardContent>
        </Card>
    );
};

