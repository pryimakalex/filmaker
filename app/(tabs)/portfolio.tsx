import { PortfolioContent } from '@/features/portfolio/PortfolioContent';
import { portfolioService } from '@/services/api/portfolio.service';
import { useQuery } from '@/shared/hooks/useQuery';
import { EmptyState } from '@/shared/ui/EmptyState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { Screen } from '@/shared/ui/Screen';

export default function PortfolioScreen() {
  const portfolio = useQuery(() => portfolioService.getPortfolio());

  if (portfolio === undefined) {
    return <LoadingState message="Loading portfolio…" />;
  }

  if (!portfolio) {
    return (
      <Screen title="Portfolio" subtitle="Public preview of your work.">
        <EmptyState
          title="No portfolio data"
          description="Sign in with the demo account to load sample data."
        />
      </Screen>
    );
  }

  return (
    <Screen title="Portfolio" subtitle="What a producer might see on a share link.">
      <PortfolioContent data={portfolio} />
    </Screen>
  );
}
