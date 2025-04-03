
import React from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative space-y-8 py-6">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="ml-6">
            <span className="block text-sm font-semibold text-agro">
              {item.year}
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
