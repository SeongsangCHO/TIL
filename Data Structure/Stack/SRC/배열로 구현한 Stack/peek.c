/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   peek.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 12:20:12 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 12:23:19 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

int		peek(t_stack *stack)
{
	int peek;

	if (isEmpty(stack))
		return (-1);
	peek = stack->data[stack->top];
	return (peek);
}
