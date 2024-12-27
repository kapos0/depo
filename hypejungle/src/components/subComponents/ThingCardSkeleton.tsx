import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

export const ThingCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4, 5].map((index: number) => (
            <li key={cn("skeleton", index)}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
)
