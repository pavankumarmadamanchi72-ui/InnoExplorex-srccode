import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Upload, Heart, Star, MapPin, 
  Camera, Image, X, Loader2, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import FloatingChatbot from '@/components/common/FloatingChatbot';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

// Sample gallery images for demo
const samplePhotos = [
  {
    id: 'sample1',
    image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600',
    caption: 'Beautiful Taj Mahal at sunrise',
    destination: 'Agra',
    likes: 245,
    rating: 5,
    created_by: 'traveler@demo.com'
  },
  {
    id: 'sample2',
    image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
    caption: 'Relaxing day at Goa beach',
    destination: 'Goa',
    likes: 189,
    rating: 4,
    created_by: 'beachlover@demo.com'
  },
  {
    id: 'sample3',
    image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600',
    caption: 'Majestic Hawa Mahal',
    destination: 'Jaipur',
    likes: 312,
    rating: 5,
    created_by: 'heritage@demo.com'
  },
  {
    id: 'sample4',
    image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600',
    caption: 'Peaceful Kerala backwaters',
    destination: 'Kerala',
    likes: 278,
    rating: 5,
    created_by: 'nature@demo.com'
  },
  {
    id: 'sample5',
    image_url: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600',
    caption: 'Adventure in Rishikesh',
    destination: 'Rishikesh',
    likes: 156,
    rating: 4,
    created_by: 'adventure@demo.com'
  },
  {
    id: 'sample6',
    image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600',
    caption: 'Spiritual evening at Varanasi Ghat',
    destination: 'Varanasi',
    likes: 423,
    rating: 5,
    created_by: 'spiritual@demo.com'
  }
];

export default function Gallery() {
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [localLikes, setLocalLikes] = useState({});
  
  const [uploadData, setUploadData] = useState({
    caption: '',
    destination: '',
    rating: 5
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const queryClient = useQueryClient();

  const { data: photos = [], isLoading } = useQuery({
    queryKey: ['memoryPhotos'],
    queryFn: () => base44.entities.MemoryPhoto.list('-created_date', 50),
    initialData: []
  });

  // Combine sample photos with user photos
  const allPhotos = [...samplePhotos, ...photos];

  const uploadMutation = useMutation({
    mutationFn: async (data) => {
      return base44.entities.MemoryPhoto.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['memoryPhotos']);
      setShowUpload(false);
      setUploadData({ caption: '', destination: '', rating: 5 });
      setSelectedFile(null);
      setPreviewUrl('');
    }
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
      await uploadMutation.mutateAsync({
        image_url: file_url,
        caption: uploadData.caption,
        destination: uploadData.destination,
        rating: uploadData.rating,
        likes: 0
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleLike = (photoId) => {
    setLocalLikes(prev => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1
    }));
  };

  const getLikes = (photo) => {
    return (photo.likes || 0) + (localLikes[photo.id] || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" className="gap-2 rounded-full">
              <ArrowLeft size={20} />
              <span className="hidden md:inline">Back</span>
            </Button>
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              📸 Memory Gallery
            </span>
          </h1>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Upload Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Button
            onClick={() => setShowUpload(true)}
            className="h-14 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-lg font-bold shadow-xl"
          >
            <Upload className="mr-2" size={22} />
            📸 Share Your Memory
          </Button>
          <p className="text-gray-500 mt-2 text-sm">Upload photos from your travels to inspire others!</p>
        </motion.div>

        {/* Photo Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {allPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <Card
                  className="overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative">
                    <img
                      src={photo.image_url}
                      alt={photo.caption}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-medium text-sm line-clamp-2">{photo.caption}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <MapPin size={12} />
                        {photo.destination}
                      </div>
                    </div>

                    {/* Like Badge */}
                    <div className="absolute top-3 right-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(photo.id);
                        }}
                        className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg flex items-center gap-1"
                      >
                        <Heart 
                          size={16} 
                          className={`${localLikes[photo.id] ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                        />
                        <span className="text-xs font-bold">{getLikes(photo)}</span>
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {allPhotos.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <Image size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">No photos yet</p>
            <p className="text-gray-400">Be the first to share!</p>
          </div>
        )}
      </main>

      {/* Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Camera className="text-pink-500" />
              Share Your Memory
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* Image Preview / Upload */}
            <div 
              className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-all ${
                previewUrl ? 'border-pink-500' : 'border-gray-300 hover:border-pink-400'
              }`}
            >
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="w-full aspect-square object-cover" />
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                    }}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-8 cursor-pointer">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                    <Camera className="text-pink-500" size={28} />
                  </div>
                  <p className="font-medium text-gray-700">Tap to select photo</p>
                  <p className="text-sm text-gray-400">JPG, PNG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Caption</label>
              <Textarea
                value={uploadData.caption}
                onChange={(e) => setUploadData(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Tell us about this moment..."
                className="rounded-xl border-2"
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                Destination
              </label>
              <Input
                value={uploadData.destination}
                onChange={(e) => setUploadData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Where was this taken?"
                className="h-12 rounded-xl border-2"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUploadData(prev => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <Star 
                      size={28} 
                      className={`${
                        star <= uploadData.rating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-lg font-bold"
            >
              {uploading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Send className="mr-2" />
              )}
              {uploading ? 'Uploading...' : 'Share Memory'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl p-0 rounded-3xl overflow-hidden">
          {selectedPhoto && (
            <>
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[60vh] object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedPhoto.caption}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} className="text-red-500" />
                    {selectedPhoto.destination}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart size={18} className="text-red-500 fill-red-500" />
                      <span className="font-bold">{getLikes(selectedPhoto)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(selectedPhoto.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <FloatingChatbot />
    </div>
  );
}