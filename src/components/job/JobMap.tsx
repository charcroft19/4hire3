import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Job {
  id: string;
  title: string;
  location: Location;
  price: string;
}

interface JobMapProps {
  jobs: Job[];
  selectable?: boolean;
  onLocationSelect?: (location: Location) => void;
}

const JobMap: React.FC<JobMapProps> = ({ 
  jobs, 
  selectable = false,
  onLocationSelect 
}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 40.0150,
    longitude: -105.2705,
    zoom: 11
  });

  const handleMarkerClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleMapClick = (event: any) => {
    if (selectable && onLocationSelect) {
      const [lng, lat] = event.lngLat;
      onLocationSelect({
        lat,
        lng,
        address: 'Selected location' // In a real app, we would use reverse geocoding here
      });
    }
  };

  return (
    <Map
      {...viewport}
      onMove={evt => setViewport(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onClick={handleMapClick}
    >
      {jobs.map(job => (
        <Marker
          key={job.id}
          latitude={job.location.lat}
          longitude={job.location.lng}
          onClick={() => handleMarkerClick(job)}
        >
          <div className="cursor-pointer">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
        </Marker>
      ))}

      {selectedJob && (
        <Popup
          latitude={selectedJob.location.lat}
          longitude={selectedJob.location.lng}
          onClose={() => setSelectedJob(null)}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
        >
          <div className="p-2">
            <h3 className="font-medium text-sm">{selectedJob.title}</h3>
            <p className="text-sm text-gray-600">{selectedJob.price}</p>
            <p className="text-xs text-gray-500 mt-1">{selectedJob.location.address}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default JobMap;