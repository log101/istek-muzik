import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs"
import { useRouter } from "next/router"
import useSWR, { Fetcher } from "swr"
import { Event } from "@prisma/client"
import Link from "next/link"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  locationTitle: z.string().min(2, {
    message: "Mekan adı en az iki harfli olmalıdır."
  })
})

const fetcher: Fetcher<Event, string> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }

  return res.json()
}

const EventPage = () => {
  const router = useRouter()

  const { data, error } = useSWR(`/api/events/${router.query.id}`, fetcher, {
    onSuccess(data) {
      form.setValue("locationTitle", data.locationTitle)
    },
    onError() {
      toast.error("Etkinlik bilgilerine ulaşılamıyor")
    },
    revalidateOnMount: true
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationTitle: data?.locationTitle
    }
  })

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='container flex flex-row items-center justify-between align-center py-4'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>

        <Separator />

        <>
          <div className='container flex flex-col space-y-8 py-4 h-full'>
            <div className='flex flex-col space-y-2'>
              <div className='text-lg'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data: any) => console.log(data))} className='space-y-8'>
                    <FormField
                      control={form.control}
                      name='locationTitle'
                      disabled={error}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mekanın İsmi</FormLabel>
                          <FormControl>
                            <Input placeholder='Oturan Boğa' {...field} />
                          </FormControl>
                          <FormDescription>Etkinliğin gerçekleşeceği mekanın ismi.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex flex-col space-y-3'>
                      <Button type='submit' className='bg-green-600 hover:bg-green-500 w-full' disabled={error}>
                        <p className='text-lg'>Kaydet</p>
                      </Button>
                      <Button variant='destructive' className='w-full' disabled={error}>
                        <p className='text-lg'>Etkinliği Sil</p>
                      </Button>
                      <Button variant='secondary' className='w-full'>
                        <Link href={`/events/${router.query.id}`}>
                          <p className='text-lg'>Geri Dön</p>
                        </Link>
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            <div className='flex flex-col space-y-3'></div>
          </div>
        </>
      </div>
    </>
  )
}

export default EventPage
