import PageHeading from "@/components/common/PageHeading";
import Tabs from "@/features/analytics/Tabs";
import ComparisonChart from "@/components/common/charts/ComparisonChart";
import Card from "@/components/ui/card/Card";
import { getMyInsights } from "@/lib/dal/analytics";
import PieChart from "@/components/common/charts/PiChart";

interface Props {
  tab: string;
}

const Analytics = async ({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) => {
  const { tab } = await searchParams;
  const res = await getMyInsights();

  return (
    <>
      <PageHeading
        heading="Insights Hub"
        description="Understand how work actually happens"
      />
      <div className="my-7 space-y-11">
        <Tabs />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tab === "my-insights" && (
            <>
              <Card>
                <div className="mb-8">
                  <h5 className={`text-lg text-card-foreground font-semibold`}>
                    Weekly Hours vs Target
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Your logged hours compared to 45h target
                  </p>
                </div>
                <ComparisonChart data={res.data.workHourTarget} />
              </Card>
              <Card>
                <div className="mb-8">
                  <h5 className={`text-lg text-card-foreground font-semibold`}>
                    Time by Category
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Distribution of effort across work types
                  </p>
                </div>
                <PieChart data={res.data.timeByCategory} />
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
