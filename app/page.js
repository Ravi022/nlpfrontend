"use client";

import React, { useState, useContext, createContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Moon, Sun, ChevronDown, ChevronUp } from "lucide-react";

// Create a context for the theme
const ThemeContext = createContext();

// Mock data for demonstration
const mockSentimentData = {
  Today: [
    { name: "Positive", value: 40 },
    { name: "Negative", value: 30 },
    { name: "Neutral", value: 30 },
  ],
  "Last Week": [
    { name: "Positive", value: 45 },
    { name: "Negative", value: 25 },
    { name: "Neutral", value: 30 },
  ],
  "Last Month": [
    { name: "Positive", value: 50 },
    { name: "Negative", value: 20 },
    { name: "Neutral", value: 30 },
  ],
};

const mockComments = {
  Positive: [
    {
      text: "This is amazing! I've been following this subreddit for a while now, and the quality of content just keeps getting better. It's so refreshing to see such positive and constructive discussions here.",
    },
    {
      text: "I love this community! Everyone is so supportive and encouraging. It's rare to find such a welcoming place on the internet these days.",
    },
    {
      text: "Great post, very informative! I learned so much from this. It's clear that a lot of research and thought went into creating this content.",
    },
    {
      text: "This made my day! I was feeling down, but reading through this thread has really lifted my spirits. Thank you all for being awesome!",
    },
    {
      text: "Awesome content as always! The moderators and contributors here are doing an incredible job. Keep up the fantastic work!",
    },
    {
      text: "I'm so glad I found this subreddit! The wealth of knowledge and positivity here is unmatched. It's become my go-to place for information and inspiration.",
    },
    {
      text: "This deserves more upvotes! It's criminal how underrated this post is. Everyone needs to see this!",
    },
    {
      text: "Keep up the good work! Posts like these are why I keep coming back to this subreddit. It's consistently high-quality and engaging.",
    },
    {
      text: "This is why I love Reddit! Where else can you find such a diverse group of people coming together to share knowledge and experiences?",
    },
    {
      text: "Very well explained, thanks! I've been struggling to understand this concept for a while, but your explanation made it crystal clear.",
    },
  ],
  Negative: [
    {
      text: "This is disappointing. I expected much more from this subreddit. The quality of posts has been declining steadily over the past few months.",
    },
    {
      text: "I expected better. This post is full of inaccuracies and misleading information. It's frustrating to see such low-quality content being upvoted.",
    },
    {
      text: "This post is misleading. The author clearly hasn't done proper research and is spreading misinformation. This needs to be addressed by the moderators.",
    },
    {
      text: "I strongly disagree with this. The arguments presented here are flawed and don't take into account the complexities of the situation.",
    },
    {
      text: "This content is getting repetitive. How many times are we going to see the same topics rehashed? We need some fresh perspectives and ideas.",
    },
    {
      text: "Not sure why this is getting upvotes. It's poorly written, lacks substance, and doesn't contribute anything meaningful to the discussion.",
    },
    {
      text: "This is a waste of time. I can't believe I spent valuable minutes of my life reading this nonsense. Do better, please.",
    },
    {
      text: "I'm unsubscribing from this subreddit. The constant negativity and lack of moderation have made this place unbearable. Goodbye!",
    },
    {
      text: "This is factually incorrect. A simple Google search would have prevented the spread of this misinformation. Please fact-check before posting.",
    },
    {
      text: "The quality of posts here is declining. What happened to the insightful discussions and well-researched content? This subreddit used to be so much better.",
    },
  ],
  Neutral: [
    {
      text: "Interesting perspective. While I don't entirely agree, I can see where the author is coming from. It's always good to consider different viewpoints.",
    },
    {
      text: "Not sure what to think about this. On one hand, the arguments seem logical, but on the other, I feel like some important factors are being overlooked.",
    },
    {
      text: "I can see both sides of the argument. This is a complex issue with no easy answers. It's good to see a balanced discussion taking place.",
    },
    {
      text: "This needs more context. While the post raises some valid points, I think we need more information to form a complete picture of the situation.",
    },
    {
      text: "I'm on the fence about this. There are compelling arguments on both sides, and I'm finding it difficult to take a firm stance either way.",
    },
    {
      text: "Could someone explain this further? I feel like I'm missing some key information that would help me understand the full implications of this topic.",
    },
    {
      text: "I have mixed feelings about this. Some parts of the post resonate with me, while others seem questionable. I'll need to do more research.",
    },
    {
      text: "This is a complex issue. It's refreshing to see a nuanced discussion instead of the usual black-and-white arguments we often see online.",
    },
    {
      text: "I need more information to form an opinion. The post raises some interesting points, but I feel like there's more to the story that we're not seeing.",
    },
    {
      text: "Let's see how this develops. It's an intriguing topic, but I think we need more time and data to fully understand its implications and potential outcomes.",
    },
  ],
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

const ExpandableComment = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Maximum number of characters to show before truncating

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedText = comment.text.slice(0, maxLength);
  const shouldTruncate = comment.text.length > maxLength;

  return (
    <div>
      <p>
        {isExpanded || !shouldTruncate ? comment.text : `${truncatedText}...`}
      </p>
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="mt-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show more
            </>
          )}
        </Button>
      )}
    </div>
  );
};

const Page = () => {
  const [subreddit, setSubreddit] = useState("");
  const [timeframe, setTimeframe] = useState("Today");
  const [sentimentFilter, setSentimentFilter] = useState("Positive");
  const [isAnalysisPerformed, setIsAnalysisPerformed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call an API to perform the sentiment analysis
    // For this example, we'll just set isAnalysisPerformed to true
    setIsAnalysisPerformed(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Reddit Sentiment Analysis Dashboard</CardTitle>
                <CardDescription>
                  Analyze sentiment for any subreddit
                </CardDescription>
              </div>
              <ThemeToggle />
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  placeholder="Enter subreddit name"
                  value={subreddit}
                  onChange={(e) => setSubreddit(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">Analyze</Button>
              </form>
            </CardContent>
          </Card>

          {isAnalysisPerformed && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis for r/{subreddit}</CardTitle>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant={timeframe === "Today" ? "default" : "outline"}
                      onClick={() => setTimeframe("Today")}
                    >
                      Today
                    </Button>
                    <Button
                      variant={
                        timeframe === "Last Week" ? "default" : "outline"
                      }
                      onClick={() => setTimeframe("Last Week")}
                    >
                      Last Week
                    </Button>
                    <Button
                      variant={
                        timeframe === "Last Month" ? "default" : "outline"
                      }
                      onClick={() => setTimeframe("Last Month")}
                    >
                      Last Month
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Sentiment Count",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockSentimentData[timeframe]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="value" fill="var(--color-value)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Comments</CardTitle>
                  <Select
                    value={sentimentFilter}
                    onValueChange={setSentimentFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select sentiment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Comment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockComments[sentimentFilter].map((comment, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <ExpandableComment comment={comment} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Page;
