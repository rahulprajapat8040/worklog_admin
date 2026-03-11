import PageHeading from "@/components/common/PageHeading";
import Tabs from "@/features/analytics/Tabs";
import ComparisonChart from "@/components/common/charts/ComparisonChart";
import Card from "@/components/ui/card/Card";
import { getMyInsights } from "@/lib/dal/analytics";

const dataExample = [
  { key: "Jan 2020", values: [11.1, 80] },
  { key: "Feb 2020", values: [18.3, 16.7] },
  { key: "Mar 2020", values: [25.1, 19.5] },
  { key: "Apr 2020", values: [35.5, 24.9] },
];

const Analytics = async () => {
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
          <Card>
            <div className="mb-8">
              <h5 className={`text-lg text-card-foreground font-semibold`}>
                Weekly Hours vs Target
              </h5>
              <p className="text-muted-foreground text-sm">
                Your logged hours compared to 45h target
              </p>
            </div>
            <ComparisonChart data={res.data} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analytics;
