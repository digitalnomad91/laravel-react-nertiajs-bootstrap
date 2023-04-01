import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm'
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager'
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm'
import SectionBorder from '@/Components/SectionBorder'
import AppLayout from '@/Layouts/AppLayout'
import { JetstreamTeamPermissions, Role, Team, TeamInvitation, User } from '@/types'
import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import MonacoEditor from '@uiw/react-monacoeditor'

/*
interface UserMembership extends User {
    membership: {
        role: string
    }
}

interface Props {
    team: Team & {
        owner: User
        team_invitations: TeamInvitation[]
        users: UserMembership[]
    }
    availableRoles: Role[]
    permissions: JetstreamTeamPermissions
}*/

export default function Services() {
    const { snippet } = usePage().props

    return (
        <AppLayout
            title={`Test`}
            renderHeader={() => <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">View Snippet</h2>}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">test</div>
            </div>
        </AppLayout>
    )
}
