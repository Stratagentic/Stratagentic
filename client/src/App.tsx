import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import ManufacturingCaseStudy from "@/pages/manufacturing-case-study";
import LogisticsCaseStudy from "@/pages/logistics-case-study";
import ProspectResearchCaseStudy from "@/pages/prospect-research-case-study";
import SalesCollateralCaseStudy from "@/pages/sales-collateral-case-study";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/case-studies/manufacturing" component={ManufacturingCaseStudy} />
      <Route path="/case-studies/logistics" component={LogisticsCaseStudy} />
      <Route path="/case-studies/prospect-research" component={ProspectResearchCaseStudy} />
      <Route path="/case-studies/sales-collateral" component={SalesCollateralCaseStudy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
