import React from "react";

export default function ContactContent() {
  return (
    <div className="prose prose-gray max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>

      <div className="text-center space-y-2 text-lg not-prose">
        <p><strong>Geos LLC</strong></p>
        <p>5631 Raven Ct, Bloomfield Hills, MI 48301</p>
        <p>
          <a
            href="mailto:sayapingeorge@gmail.com"
            className="text-blue-700 underline"
          >
            sayapingeorge@gmail.com
          </a>
        </p>
        <p>
          <a
            href="tel:+12483462681"
            className="text-blue-700 underline"
          >
            (248) 346-2681
          </a>
        </p>
        <p>
          <a
            href="https://geos-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            www.geos-ai.com
          </a>
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-blue-200 shadow-lg not-prose">
        <iframe
          title="Geos LLC Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.3762989793185!2d-83.3023392845298!3d42.541841828224914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c9597f9e5a7f%3A0x7a36a010f166bb38!2s5631%20Raven%20Ct%2C%20Bloomfield%20Hills%2C%20MI%2048301!5e0!3m2!1sen!2sus!4v1719432271591!5m2!1sen!2sus"
          className="w-full h-[400px] border-0"
          loading="lazy"
          allowFullScreen
          style={{
            filter: "hue-rotate(190deg) saturate(120%) brightness(0.95)"
          }}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
