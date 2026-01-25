import { prisma } from '@/lib/prisma'; // ajusta si tu prisma client está en otra ruta

type GuardResult =
  | {
      ok: true;
      adminUserId: string;
      businessId: string;
      role: 'ADMIN' | 'PROFESSIONAL' | 'CUSTOMER';
    }
  | {
      ok: false;
      reason: 'NO_SESSION' | 'NO_EMAIL' | 'NOT_ALLOWED' | 'INACTIVE';
    };

export async function guardAdminAccess(params: {
  supabaseUserId: string;
  email: string;
}): Promise<GuardResult> {
  const { supabaseUserId, email } = params;

  // Nota: si manejas múltiples negocios, aquí debes decidir businessId por dominio/subdominio.
  // Para iniciar simple: un solo negocio => buscamos por email en cualquier business.
  const admin = await prisma.adminUser.findFirst({
    where: {
      email: email.toLowerCase(),
    },
    select: {
      id: true,
      businessId: true,
      role: true,
      isActive: true,
      supabaseUserId: true,
    },
  });

  if (!admin) return { ok: false, reason: 'NOT_ALLOWED' };
  if (!admin.isActive) return { ok: false, reason: 'INACTIVE' };

  // Linking: si aún no está linkeado, lo fijamos. Si ya está linkeado, validamos que coincida.
  if (!admin.supabaseUserId) {
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { supabaseUserId },
    });
  } else if (admin.supabaseUserId !== supabaseUserId) {
    // Esto evita que un correo allowlisted se use con otra cuenta distinta (caso raro pero importante).
    return { ok: false, reason: 'NOT_ALLOWED' };
  }

  return {
    ok: true,
    adminUserId: admin.id,
    businessId: admin.businessId,
    role: admin.role,
  };
}
