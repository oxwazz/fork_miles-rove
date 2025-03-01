"use client"


import { useState } from "react"
import { OrderBy } from "@/types"
import { SearchForm } from "@/components/flights/search-form"
import { FlightResults } from "@/components/flights/flight-result"
import { CabinClass, FlightSearchParams } from "@/types/flight"
import { useFlightSearch } from "@/hooks/useFlight"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import SkipLinks from "@/components/wcag/skip-link"

export default function Page() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    originAirport: '',
    destinationAirport: '',
    startDate: '',
    endDate: '',
    orderBy: 'default',
    take: 20
  })

  const { data, isLoading, error } = useFlightSearch(searchParams)

  const handleSearch = (formData: {
    origin: string
    destination: string
    startDate: string
    endDate: string
    orderBy: OrderBy
  }) => {
    setSearchParams({
      originAirport: formData.origin,
      destinationAirport: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      orderBy: formData.orderBy,
      take: 20
    })
  }
  const handleSortChange = (orderBy: "default" | "lowest_mileage") => {
    setSearchParams(prev => ({
      ...prev,
      orderBy
    }))
  }
  const handleCabinChange = (cabin: CabinClass | null) => {
    setSearchParams(prev => ({
      ...prev,
      cabin
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SkipLinks searchFormId="search-form" resultsId="flight-results" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Award ASIAN Flight Search</h1>
        <div id="search-form">
          <SearchForm onSearch={handleSearch} />
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error ? error.message : 'An error occurred while fetching flights'}
            </AlertDescription>
          </Alert>
        )}
        <main id="flight-results">
          <FlightResults isLoading={isLoading} flights={data?.data ?? []} searchParams={searchParams} onSortChange={handleSortChange} onCabinChange={handleCabinChange} />
        </main>
      </div>
    </div>
  )
}

