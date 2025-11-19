import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import PromptCaseStudy from "@/pages/prompt-engine";
import LogisticsCaseStudy from "@/pages/logistics-case-study";
import ProspectResearchCaseStudy from "@/pages/prospect-research-case-study";
import SalesCollateralCaseStudy from "@/pages/sales-collateral-case-study";
import LinkedInGrowthCaseStudy from "@/pages/linkedin-growth-case-study";
import OutreachEngineCaseStudy from "@/pages/outreach-engine-case-study";
import SalesDeckCaseStudy from "@/pages/sales-deck-automation";
import FAQ from "@/pages/faq";
import Team from "@/pages/team";
import Resources from "@/pages/resources"; // ADD THIS LINE
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/case-studies/prompt-engine" component={PromptCaseStudy} />
      <Route path="/case-studies/logistics" component={LogisticsCaseStudy} />
      <Route path="/case-studies/prospect-research" component={ProspectResearchCaseStudy} />
      <Route path="/case-studies/sales-collateral" component={SalesCollateralCaseStudy} />
      <Route path="/case-studies/linkedin-growth" component={LinkedInGrowthCaseStudy} />
      <Route path="/case-studies/outreach-engine" component={OutreachEngineCaseStudy} />
      <Route path="/case-studies/sales-deck-automation" component={SalesDeckCaseStudy} />
      <Route path="/faq" component={FAQ} />
      <Route path="/team" component={Team} />
      <Route path="/resources" component={Resources} /> {/* ADD THIS LINE */}
      <Route path="/:rest*" component={NotFound} /> {/* CHANGE THIS LINE */}
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
