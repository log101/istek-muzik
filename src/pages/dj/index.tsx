// SWR
import useSWR, { Fetcher } from "swr"

// Clerk
import { UserButton, useUser } from "@clerk/nextjs"

// Shadcn
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

// Form
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Types
import { Event } from "@prisma/client"

const formSchema = z.object({
  locationTitle: z.string().min(2, {
    message: "Mekan adı en az iki harfli olmalıdır."
  })
})

const fetcher: Fetcher<Event[], string> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }

  return res.json()
}

function EventForm() {
  const { user } = useUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationTitle: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      const data = {
        locationTitle: values.locationTitle
      }

      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            toast("Etkinlik oluşturuldu, aksiyon zamanı!")
          } else {
            throw new Error()
          }
        })
        .catch(() => toast.error("Etkinlik oluşturulamadı, tekrar dener misin?"))
    }
  }

  return (
    <div className='border rounded p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='locationTitle'
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
          <Button type='submit' className='bg-green-600 hover:bg-green-500 w-full'>
            <p className='text-lg'>Etkinliği Oluştur</p>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default function DjHomePage() {
  const { data, error } = useSWR("/api/events/latest", fetcher)

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='container flex flex-row items-center justify-between align-center py-4'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>

        <Separator />

        <div className='container flex flex-col space-y-3 py-4 h-full'>
          <div className='flex flex-col space-y-2'>
            {data && (
              <>
                <h2 className='text-xl'>Etkinlikler</h2>
                {data?.map(event => (
                  <div key={event.id} className='flex flex-row space-x-3 items-center'>
                    <div className='w-20 h-20 bg-slate-100 border rounded shadow-sm'></div>
                    <div className='flex flex-col space-y-2'>
                      <p className='text-lg'>{event.locationTitle}</p>
                      <p className='text-lg font-light'>
                        {event.startedAt ? event.startedAt.toLocaleString() : "Etkinlik Henüz Başlamadı"}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            {error && <EventForm />}
            {data && (
              <Button className='bg-green-600 hover:bg-green-500'>
                <p className='text-lg'>Etkinliğe Git</p>
              </Button>
            )}
            <Button variant='secondary' className='bg-blue-400 hover:bg-blue-300'>
              <p className='text-lg'>Tavsiyelerini Düzenle</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
