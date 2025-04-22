import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonSpotlight } from "@/components/ui/button-spotlight";
import { Input } from "@/components/ui/input";
import { ExternalLink, Github, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectCategories, ProjectCategory } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  
  // Filter projects based on search query and selected category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);
  
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  return (
    <section id="projects" className="py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured <span className="text-primary">Projects</span>
        </motion.h2>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by name, description or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-primary/20 focus:border-primary"
              />
            </div>
            <div className="md:w-1/4">
              <div className="flex items-center border rounded-md px-3 py-2 bg-card">
                <Filter className="h-4 w-4 text-muted-foreground mr-2" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | "All")}
                  className="bg-transparent flex-1 outline-none"
                >
                  <option value="All">All Categories</option>
                  {projectCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="All" value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ProjectCategory | "All")} className="w-full">
            <TabsList className="w-full mb-6 flex flex-wrap h-auto py-2 bg-muted/50">
              <TabsTrigger value="All" className="flex-grow data-[state=active]:bg-primary data-[state=active]:text-white">
                All
              </TabsTrigger>
              {projectCategories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex-grow data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-0">
              {currentProjects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode="wait">
                    {currentProjects.map((project, index) => (
                      <motion.div 
                        key={project.title}
                        className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        layout
                      >
                        <div className="relative overflow-hidden" style={{ height: "220px" }}>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 w-full">
                              <Badge className="mb-2 bg-primary/80 hover:bg-primary text-white border-none">
                                {project.category}
                              </Badge>
                              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <p className="mb-4 text-muted-foreground line-clamp-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-4">
                            <ButtonSpotlight 
                              size="sm" 
                              variant="outline" 
                              className="border-primary/30 hover:border-primary"
                              spotlightColor="rgba(var(--primary), 0.15)" 
                              spotlightSize={120}
                              spotlightOpacity={0.3}
                              asChild
                            >
                              <a href={project.demo} className="font-medium flex items-center">
                                <span>Demo</span>
                                <ExternalLink className="ml-1 h-3.5 w-3.5" />
                              </a>
                            </ButtonSpotlight>
                            <ButtonSpotlight 
                              size="sm" 
                              variant="outline" 
                              className="border-primary/30 hover:border-primary"
                              spotlightColor="rgba(var(--primary), 0.15)" 
                              spotlightSize={120}
                              spotlightOpacity={0.3}
                              asChild
                            >
                              <a href={project.code} className="font-medium flex items-center">
                                <span>Code</span>
                                <Github className="ml-1 h-3.5 w-3.5" />
                              </a>
                            </ButtonSpotlight>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              
              {/* Pagination */}
              {filteredProjects.length > projectsPerPage && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
                  <div className="text-sm text-muted-foreground order-2 md:order-1">
                    Showing {(currentPage - 1) * projectsPerPage + 1} - {Math.min(currentPage * projectsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                  </div>
                  <div className="flex space-x-2 order-1 md:order-2">
                    <ButtonSpotlight 
                      variant="outline" 
                      size="icon" 
                      onClick={handlePrevPage} 
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                      spotlightColor="rgba(var(--primary), 0.15)"
                      spotlightSize={60}
                      spotlightOpacity={0.3}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </ButtonSpotlight>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <ButtonSpotlight
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        className={`h-8 w-8 p-0 ${page === currentPage ? 'bg-primary text-white' : ''}`}
                        onClick={() => setCurrentPage(page)}
                        spotlightColor={page === currentPage ? 
                          "rgba(var(--primary), 0.2)" : 
                          "rgba(var(--primary), 0.1)"}
                        spotlightSize={80}
                        spotlightOpacity={0.3}
                      >
                        {page}
                      </ButtonSpotlight>
                    ))}
                    <ButtonSpotlight 
                      variant="outline" 
                      size="icon" 
                      onClick={handleNextPage} 
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                      spotlightColor="rgba(var(--primary), 0.15)"
                      spotlightSize={60}
                      spotlightOpacity={0.3}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </ButtonSpotlight>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-3 rounded-md text-md font-medium group transition-all"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5 inline"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
