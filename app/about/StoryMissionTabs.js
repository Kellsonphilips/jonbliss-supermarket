import React from 'react';

export default function StoryMissionTabs({ activeTab, setActiveTab }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center mb-8">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'story'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'mission'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Mission & Vision
          </button>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg">
          {activeTab === 'story' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Jonbliss began as a dream in the heart of John Smith, a passionate entrepreneur who believed that grocery shopping should be more than just a chore – it should be an experience that brings joy and convenience to people&apos;s lives. In 2014, armed with nothing but a vision and a small loan from his family, John opened the first Jonbliss store in a modest 2,000-square-foot space in downtown.
                </p>
                <p>
                  Those early days were filled with challenges that would have discouraged most people. John worked 16-hour days, personally greeting every customer, learning their names, and understanding their needs. He would often stay late to rearrange shelves, test new products, and find ways to make the shopping experience better. His dedication didn&apos;t go unnoticed – within six months, Jonbliss became the talk of the neighborhood.
                </p>
                <p>
                  The turning point came in 2016 when Sarah Johnson joined as our first Operations Director. Her background in retail management and her shared passion for customer service helped us scale our operations while maintaining the personal touch that made us special. Together, John and Sarah expanded to our second location, this time in a bustling suburban area.
                </p>
                <p>
                  By 2018, Jonbliss had grown to serve over 10,000 customers weekly. We introduced our first loyalty program, launched our online ordering system, and began sourcing products directly from local farmers. The community response was overwhelming – people weren&apos;t just shopping with us; they were becoming part of the Jonbliss family.
                </p>
                <p>
                  Today, Jonbliss stands as a testament to what happens when you put people first. We&apos;ve expanded to serve over 50,000 customers across multiple locations, but we&apos;ve never lost sight of what made us successful in the first place: treating every customer like family, offering the highest quality products, and creating a shopping experience that people actually look forward to.
                </p>
                <p>
                  Our journey has been marked by countless small moments – the elderly couple who comes in every Sunday for their weekly groceries, the young mother who knows our staff by name, the business owner who trusts us to supply their restaurant. These relationships, built one interaction at a time, are what make Jonbliss more than just a supermarket – we&apos;re a cornerstone of the community.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'mission' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mission &amp; Vision</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At Jonbliss, our mission is simple yet profound: we exist to nourish not just bodies, but communities. We believe that access to quality, affordable groceries is a fundamental right, not a privilege. Every decision we make, from the products we stock to the way we train our staff, is guided by this core belief.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We&apos;re committed to providing our customers with the freshest, highest-quality products at prices that don&apos;t break the bank. But our mission goes beyond just selling groceries. We strive to create a shopping experience that feels personal, welcoming, and efficient. Whether it&apos;s remembering a customer&apos;s name, helping them find a specific ingredient, or simply offering a friendly smile, we want every interaction to leave people feeling valued and cared for.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We also believe in the power of community. That&apos;s why we partner with local farmers, support neighborhood initiatives, and create spaces where people can connect. We&apos;re not just a store – we&apos;re a gathering place, a resource, and a trusted partner in our customers&apos; daily lives.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Looking toward the future, we envision Jonbliss as the leading supermarket chain that redefines what grocery shopping can be. We see ourselves as pioneers in creating a retail experience that seamlessly blends technology with human connection, innovation with tradition, and growth with community responsibility.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We dream of a future where Jonbliss is synonymous with quality, trust, and community service across the region. We want to be the first name that comes to mind when people think about where to get their groceries – not just because we have the best products, but because we have the best people, the best service, and the strongest commitment to our communities.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our vision includes expanding our reach while maintaining the intimate, personal service that made us successful. We plan to leverage cutting-edge technology to make shopping more convenient – from advanced inventory management systems to seamless online ordering and delivery – while ensuring that every customer still feels like they&apos;re shopping at their neighborhood store.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Most importantly, we envision Jonbliss as a catalyst for positive change in the communities we serve. We want to be known not just for our products, but for our commitment to sustainability, our support of local businesses, our investment in our employees, and our dedication to making a difference. We believe that success isn&apos;t just measured in sales numbers, but in the lives we touch and the communities we strengthen.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 