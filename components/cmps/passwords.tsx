'use client'

import { readPasswords } from '@/server/actions'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Globe, Key, User, FileText, Calendar } from 'lucide-react'
import { PasswordInput } from '../inputs/pwd-input'

export default function Passwords() {
    const { data, isLoading } = useQuery({
        queryKey: ['passwords'],
        queryFn: readPasswords
    })

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">No passwords found</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((password, index) => (
                <Card
                    key={password._id || index}
                    className='!rounded-sm !shadow-none hover:scale-105 transition-transform duration-300'
                >
                    <CardHeader>
                        <CardTitle>{password.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Globe className="mr-2 h-4 w-4" />
                                <span className="text-sm">{password.url}</span>
                            </li>
                            <li className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                <span className="text-sm">{password.username}</span>
                            </li>
                            <li className="flex items-center">
                                <Key className="mr-2 h-4 w-4" />
                                <PasswordInput
                                    value={password.password}
                                    className="w-full"
                                    placeholder="********"
                                />
                            </li>
                            {password.notes && (
                                <li className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span className="text-sm">{password.notes}</span>
                                </li>
                            )}
                            <li className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Updated: {new Date(password.updatedAt).toLocaleDateString()}</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}